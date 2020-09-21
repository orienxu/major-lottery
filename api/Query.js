const sql = require('mysql');
const crypto = require('crypto');
//const { serialize } = require('v8');
const userConfig = require('./Config');
const { CARDS } = require('./Config');

const LOGIN_CHECK_USER_EXIST = "Select U.username, U.salt From Users As U Where U.username = ?";
const LOGIN_CHECK_CRED = "Select U.username From Users As U Where U.username = ? and U.pass = ?";
const REGISTER_CHECK_USER_EXIST = "Select U.username From Users As U Where U.username = ? ";
const REGISTER_ADD_USER = "INSERT INTO Users VALUES(?, ?, ?, ?)";
const LOTTERY_CHECK_USER_EXIST = "Select UC.username From UserCard As UC Where UC.username = ?";
const INIT_USER_CARD = "Insert Into UserCard Values(?, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)";
const CHECK_TIME_LEFT = "Select U.username, U.timeLeft From Users As U Where U.username = ?";
const UPDATE_TIME_LEFT = "Update Users As U Set U.timeLeft = ? Where U.username = ?";
const UPDATE_OWNED_CARD = "Update UserCard As UC Set ";
const MAX_MAJOR_NUMBER = 16;
const INIT_TIME_LEFT = 9;

const USER_NOT_FOUND = -1;
const INCORRECT_PASSWORD_OR_USERNAME = -2;
const VIEW_OWNED = "SELECT UC.cse, UC.ee, UC.info, UC.design, UC.acms, UC.biochem, UC.stat, UC.com, UC.arch, UC.me, UC.foster, UC.psych, UC.phys, UC.math, UC.music, UC.chem FROM UserCard As UC JOIN Users As U ON UC.username = U.username WHERE U.username = ?";

class Query {
    constructor(config) {
        this.config = config;
        this.connection = null;
    }

    registerHelper(res) {
        console.log(res);
    }

    generateSalt() {
        let salt = '';
        const buf = crypto.randomBytes(32);
        salt = buf.toString('hex');
        return salt;
    }

    init() {
        this.connection = sql.createConnection(this.config);
        this.connection.connect(function (err) {
            if(err) console.error("error" + err.stack);
        });
    }

    logIn(username, passwd, callback){
        var self = this;
        let salt = null;
        let res = null;
        const hash = crypto.createHash('sha256');
        self.connection.query(LOGIN_CHECK_USER_EXIST, [username], function (err, results, fields) {
            if (err) {
                throw err;
            }
            if (results.length < 1) {
                res = userConfig.USER_NOT_FOUND;
                callback(res);
                return;
            }
            salt = results[0]['salt'];
            var hashedPass = hash.update(passwd, salt).digest("hex");

            //add the passd + salt encryption and hash to compare.
            self.connection.query(LOGIN_CHECK_CRED, [username, hashedPass], function (err, results, fields) {
                if (err) {
                    throw err;
                }
                if (results.length == 0) {
                    res = userConfig.INCORRECT_PASSWORD_OR_USERNAME;
                }
                else {
                    res = results[0]['username'];
                }
                callback(res);
            });
        });
    }

    register(username, passwd, callback){
        console.log("Info for register:" + username + " " + passwd);
        var self = this;
        const hash = crypto.createHash('sha256');
        self.connection.query(REGISTER_CHECK_USER_EXIST, [username], function (err, results, fields) {
            if (err) {
                throw err;
            }
            console.log(results[0]);
            if (results.length === 0) {
                var salt = self.generateSalt();
                var hashedPass = hash.update(passwd, salt).digest("hex");
    
                self.connection.query(REGISTER_ADD_USER, [username, hashedPass, salt, INIT_TIME_LEFT], function (err, results, fields) {
                    if (err) {
                        throw err;
                    }
                    callback("New user registered");
                })
            } else {
                callback("Username is already taken");
            }
        });
    }

    // Pre: Username exist in the User table.
    // Post: return a array of string containing the result of lottery through callback;
    //             or a msg represent fail of lottery(do not have enough time);
    updateUserCard(username, callback) {
        const majorList = ["cse", "ee", "info", "design", "acms", "biochem", "stat", "com",
                           "arch", "me", "foster", "psych", "phys", "math", "music", "chem"];
        var self = this;
        self.connection.query(LOTTERY_CHECK_USER_EXIST, [username], function (err, results, fields) {
            if (err) {
                throw err;
            }
            if (results.length === 0) {
                self.connection.query(INIT_USER_CARD, [username], function (err, results, fields) {
                    if (err) {
                        throw err;
                    }
                })
            }
        })
        self.connection.query(CHECK_TIME_LEFT, [username], function (err, results, fields) {
            if (err) {
                throw err;
            }
            var timeLeft = results[0]['timeLeft'];
            if (timeLeft >= 3) {
                var lotteryResult = ["NONE", "NONE", "NONE"];
                var number = 0;
                var index = -1;
                while (number < 3) {
                    index = Math.floor(Math.random() * Math.floor(MAX_MAJOR_NUMBER));
                    if (lotteryResult[0] !== majorList[index] && lotteryResult[1] !== majorList[index] && lotteryResult[2] !== majorList[index]) {
                        lotteryResult[number] = majorList[index];
                        number++;
                    }
                }
                var cardUpdateSql = self.cardUpdateAssemble(lotteryResult[0], lotteryResult[1], lotteryResult[2]);
                self.connection.query(cardUpdateSql, [username], function (err, results, fields) {
                    if (err) {
                        throw err;
                    }
                    console.log("new cards updated");
                })
                var resCardInfo = [lotteryResult[0], lotteryResult[1], lotteryResult[2]];
                timeLeft = timeLeft - 3;
                self.connection.query(UPDATE_TIME_LEFT, [timeLeft, username], function (err, results, fields) {
                    if (err) {
                        throw err;
                    }
                    console.log("time left updated");
                })
                callback(resCardInfo);
            } else {
                callback("Don't have enough lottery chances")
            }
        })

    }

    ownedCards(username, callback) {
        var self = this;
        let res = [];
        self.connection.query(VIEW_OWNED, [username], function (err, results) {
          if (err) {
              throw err;
          }
          if (results.length < 1) {
              res = userConfig.EMPTY_OWNED;
              callback(res);
              return;
          }
          for (let i = 0; i < CARDS.length; i++) {
              let cardName = CARDS[i];
              let owned = results[0][cardName];
              if (owned == 1) {
                res.push(cardName + ".png");
              }
          }
          callback(res);
        });
    }

    cardUpdateAssemble(card1, card2, card3) {
        var cardListSql = "UC." + card1 + " = '1', UC." + card2 + " = '1', UC." + card3 + " = '1' Where UC.username = ?";
        return UPDATE_OWNED_CARD + cardListSql;
     }
    ownedCardsHelper(res) {
        console.log(res);
    }

    exit() {
        this.connection.end(function(err) {
            console.log("Logging out of the db");
        });
    }
}

module.exports = Query;