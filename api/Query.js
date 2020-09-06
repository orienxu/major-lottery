const sql = require('mysql');
const crypto = require('crypto');

const LOGIN_CHECK_USER_EXIST = "Select U.username, U.salt From Users As U Where U.username = ?";
const LOGIN_CHECK_CRED = "Select U.username From Users As U Where U.username = ? and U.pass = ?";
const REGISTER_CHECK_USER_EXIST = "Select U.username From Users As U Where U.username = ? "
REGISTER_ADD_USER = "INSERT INTO Users VALUES(?, ?, ?, ?)";

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

    init() {
        this.connection = sql.createConnection(this.config);
        this.connection.connect(function (err) {
            if(err) console.error("error" + err.stack);
        });

        //console.log(this.logIn("weifeng", "123", this.logInHelper));
        //this.register("weifeng", "123", this.registerHelper);
        // this.logIn("weifeng","123", this.registerHelper);
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

    

    updateUserCard(username) {
        
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