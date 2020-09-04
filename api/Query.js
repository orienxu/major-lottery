const sql = require('mysql');
const LOGIN_CHECK_USER_EXIST = "Select U.username From Users As U Where U.username = ?";
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
            console.log("We made it");
        });

        this.logIn("weifeng1", "mf");
    }

    logIn(username, passwd){
        this.connection.query(LOGIN_CHECK_USER_EXIST, [username], function (err, results, fields) {
            if (err) {
                throw err;
            }
            console.log(results[0]);
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