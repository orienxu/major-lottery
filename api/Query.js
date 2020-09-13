const sql = require('mysql');
const crypto = require('crypto');

const LOGIN_CHECK_USER_EXIST = "Select U.username, U.salt From Users As U Where U.username = ?";
const LOGIN_CHECK_CRED = "Select U.username From Users As U Where U.username = ? and U.pass = ?";
const REGISTER_CHECK_USER_EXIST = "Select U.username From Users As U Where U.username = ? ";
const REGISTER_ADD_USER = "INSERT INTO Users VALUES(?, ?, ?, ?)";
const GET_CARD_INFO = "Select CD.cardName, CD.intro, CD.majorDescript From CardDetail As CD Where CD.cardName = ?";
const CHECK_TIME_LEFT = "Select U.username, U.timeLeft From Users As U Where U.username = ?";
const UPDATE_TIME_LEFT = "Update U From Users As U Set U.timeLeft = ? Where U.username = ?";
const UPDATE_OWNED_CARD = "Update UC From UserCard As UC Set UC.? = '1', UC.? = '1', UC.? = '1' Where UC.username = ?"; //join?
const MAX_MAJOR_NUMBER = 16;

const USER_NOT_FOUND = -1;
const INCORRECT_PASSWORD_OR_USERNAME = -2;

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

    getCardInfo(cardname, callback) {
        var self = this;
        self.connection.query(GET_CARD_INFO, [cardname], function (err, results, fields) {
            if (err) {
                throw err;
            }
            callback("name" + results[0]["cardName"] + "Intro:" + results[0]["intro"] + "Description:" + results[0]["majorDescript"]);
            return results[0];
        })
    }

    init() {
        this.connection = sql.createConnection(this.config);
        this.connection.connect(function (err) {
            if(err) console.error("error" + err.stack);
        });

        this.updateUserCard("weifeng", this.registerHelper);
        //console.log(this.logIn("weifeng", "123", this.logInHelper));
        //this.register("weifeng", "123", this.registerHelper);
        //this.logIn("weifeng","123", this.registerHelper);
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
                res = USER_NOT_FOUND;
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
                    res = INCORRECT_PASSWORD_OR_USERNAME;
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
            if (results.length == 0) {
                var salt = self.generateSalt();
                var hashedPass = hash.update(passwd, salt).digest("hex");
    
                self.connection.query(REGISTER_ADD_USER, [username, hashedPass, salt, 3], function (err, results, fields) {
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

    updateUserCard(username, callback) {
        const majorList = ["cse", "ee", "info", "design", "acms", "biochem", "stat", "com",
                           "arch", "me", "foster", "psych", "phys", "math", "music", "chem"];
        var self = this;
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
                self.connection.query(UPDATE_OWNED_CARD, [lotteryResult[0],lotteryResult[1],lotteryResult[2],username],
                    function (err, results, fields) {
                    if (err) {
                        throw err;
                    }
                    callback("new cards updated");
                })
                var resCardInfo = ["NONE", "NONE", "NONE"];
                var i;
                for (i = 0; i<resCardInfo.length; i++) {
                    resCardInfo[i] = getCardInfo(lotteryResult[i], callback);
                }
                // timeLeft = timeLeft - 3;
                // self.connection.query(UPDATE_TIME_LEFT, [timeLeft, username], function (err, results, fields) {
                //     if (err) {
                //         throw err;
                //     }
                //     calllback("time left updated");
                // })
                callback(resCardInfo);
            } else {
                callback("Don't have enough lottery chances")
            }
        })
    }

    // errorHandler(err) {
    //      if (err) {
    //          console.error("error" + err.stack);
    //          throw err;
    //      }
    // }

    exit() {
        this.connection.end(function(err) {
            console.log("Logging out of the db");
        });
    }
}

module.exports = Query;