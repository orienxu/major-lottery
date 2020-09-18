const http = require('http');
const propertiesReader = require('properties-reader');
const properties = propertiesReader('./api/dbconn.properties');
const urlParser = require('url');
const Query = require('./Query');
const Config = require('./Config');

<<<<<<< HEAD
const USER_NOT_FOUND = -1;
const INCORRECT_PASSWORD_OR_USERNAME = -2;
const REGISTER_SUCCESS = "New user registered";
const REGISTER_FAILED = "Username is already taken";
const TIME_LEFT_NOT_ENOUGH = "Don't have enough lottery chances";
=======
>>>>>>> e85b4af98f77d2ac0bfe370d560cb0f689eca9ac

class Server {
    constructor() {
        this.query = null;
        this.url = null;
        this.username = null;
        this.passwd = null;
        this.dbname = null;
    }

    init() {
        this.url = properties.get('lottery.server_url');
        this.dbname = properties.get('lottery.database_name');
        this.username = properties.get('lottery.username');
        this.passwd = properties.get('lottery.password');
        this.port = properties.get('lottery.port');
        this.query = new Query({
            host: this.url,
            user: this.username,
            password: this.passwd.toString(),
            database: this.dbname,
            port: this.port
        });
        this.query.init();
    }

    doLogin(username, password) {
        this.query.logIn(username, password, )
    }



    doRegister(username, password) {
        //TODO
    }

    // doGenerateNewCard(username) {
    //     //TODO
    // }

    doAction(action, param, res) {
        switch(action) {
            case '/login':
                //Note: key on param depends on the param structure and how u name the input
                this.query.logIn(param['username'], param['password'], function(result) {
                    if (result === USER_NOT_FOUND){
                        res.end(JSON.stringify({"result" : "User not found", "outcome" : 0}));
                    }
                    else if (result === INCORRECT_PASSWORD_OR_USERNAME) {
                        res.end(JSON.stringify({"result" : "Incorrect password or username", "outcome" : 0}));
                    }
                    else {
                        res.end(JSON.stringify({"result" : result + " logged in", "outcome" : 1}));
                    }
                });
                //TODO return
                break;
            case '/register':
                //TODO
                this.query.register(param['username'], param['password'], function(result) {
                    if (result === REGISTER_SUCCESS) {
                        res.end(JSON.stringify({"result" : result, "success" : 1}));
                    } else if (result === REGISTER_FAILED) {
                        res.end(JSON.stringify({"result" : result, "success" : 0}));
                    }
                });
                break;
            case '/generateNewCard':
                //TODO
                this.query.updateUserCard(param['username'], function(result) {
                    if (result = TIME_LEFT_NOT_ENOUGH) {
                        res.end(JSON.stringify({"result" : result, "success" : 0}));
                    } else {
                        res.end(JSON.stringify({"result" : result, "success" : 1}));
                    }
                })
                break;
            case '/ownedCards':
                this.query.ownedCards(param['username'], function(result) {
                    if (result === Config.EMPTY_OWNED){
                        res.end(JSON.stringify({"result" : "User has no cards", "outcome" : 0})); // outcome?

                    }
                    res.end(JSON.stringify({"result" : result, "outcome" : 1}));
                });
            //add in however many needed action here.
        }
        return 0;
    }

    run(){
        //do not delete, this is for the callback function to refer back to the current object
        var self = this;
        const running = http.createServer(function (req,res) {
            res.setHeader("Content-Type", "application/json");
            const reqSummary = urlParser.parse(req.url, true);
            self.doAction(reqSummary.pathname, reqSummary.query, res);
            //TODO write response base on doAction result in JSON format;
        });
        console.log("Server running...");
        running.listen(9000);

    }

    close() {
        running.close(function() {
            console.log("Closing server");
        });
        this.query.exit();
    }




}

module.exports = Server;

