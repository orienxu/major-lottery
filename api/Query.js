const sql = require('mysql');
const crypto = require('crypto');
const hash = crypto.createHash('sha256');
const LOGIN_CHECK_USER_EXIST = "Select U.username, U.salt From Users As U Where U.username = ?";
const LOGIN_CHECK_CRED = "Select U.username From Users As U Where U.username = ? and U.pass = ?";

class Query {
    constructor(config) {
        this.config = config;
        this.connection = null;
    }

    async init() {
        this.connection = sql.createConnection(this.config);
        this.connection.connect(function (err) {
            if(err) console.error("error" + err.stack);
        });

        this.logIn("weifeng1", "123");
    }

    logIn(username, passwd){
        var self = this;
        var salt = null;
        self.connection.query(LOGIN_CHECK_USER_EXIST, [username], function (err, results, fields) {            
            if (err) {
                throw err;
            }
            if (results.length < 0) {
                console.error("Cannot find user");
                return null;
            }       
            salt = results[0]['salt'];

        });

        var hashedPass = hash.update(passwd, salt).digest("hex");

        //add the passd + salt encryption and hash to compare.
        self.connection.query(LOGIN_CHECK_CRED, [username, hashedPass], function (err, results, fields) {
            if (err) {
                throw err;
            }
            return results[0]['username'];

        });
    }

    register(username, passwd){

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