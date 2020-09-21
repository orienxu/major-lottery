const http = require('http');
const propertiesReader = require('properties-reader');
const properties = propertiesReader('./api/dbconn.properties');
const urlParser = require('url');
const Query = require('./Query');
const Config = require('./Config');

const USER_NOT_FOUND = -1;
const INCORRECT_PASSWORD_OR_USERNAME = -2;
const REGISTER_SUCCESS = "New user registered";
const REGISTER_FAILED = "Username is already taken";
const TIME_LEFT_NOT_ENOUGH = "Don't have enough lottery chances";

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
                break;
            case '/register':
                this.query.register(param['username'], param['password'], function(result) {
                    if (result === REGISTER_SUCCESS) {
                        res.end(JSON.stringify({"result" : result, "success" : 1}));
                    } else if (result === REGISTER_FAILED) {
                        res.end(JSON.stringify({"result" : result, "success" : 0}));
                    }
                });
                break;
            case '/generateNewCard':
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

