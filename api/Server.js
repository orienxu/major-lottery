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
        switch (action) {
            case '/api/login':
                //Note: key on param depends on the param structure and how u name the input

                this.query.logIn(param['username'], param['password'], function (result) {
                    if (result === USER_NOT_FOUND) {
                        res.end(JSON.stringify({ "result": "User not found", "success": 0 }));
                    }
                    else if (result === INCORRECT_PASSWORD_OR_USERNAME) {
                        res.end(JSON.stringify({ "result": "Incorrect password or username", "success": 0 }));
                    }
                    else {
                        res.end(JSON.stringify({ "result": result + " logged in", "success": 1 }));
                    }
                });
                break;
            case '/api/register':
                if (param['password'] == null || param['password'] === "") {
                    break;
                }
                this.query.register(param['username'], param['password'], function (result) {
                    if (result === REGISTER_SUCCESS) {
                        res.end(JSON.stringify({ "result": result, "success": 1 }));
                    } else if (result === REGISTER_FAILED) {
                        res.end(JSON.stringify({ "result": result, "success": 0 }));
                    }
                });
                break;
            case '/api/generateNewCard':
                this.query.updateUserCard(param['username'], function (result) {
                    if (result === TIME_LEFT_NOT_ENOUGH) {
                        res.end(JSON.stringify({ "result": result, "success": 0 }));
                    } else {
                        res.end(JSON.stringify({ "result": result, "success": 1 }));
                    }
                })
                break;
            case '/api/ownedCards':
                this.query.ownedCards(param['username'], function (result) {
                    if (result === Config.EMPTY_OWNED) {
                        console.log("ending")
                        res.end(JSON.stringify({ "result": "User has no cards", "success": 0 }));                        
                    } else {
                        res.end(JSON.stringify({ "result": result, "success": 1 }));
                    }                    
                });
                break;
            case '/api/updateTime':
                if (!this.checkUserName(param['username'])) {
                    res.end(JSON.stringify({"success" : 0, "error" : "Invalid username"}));
                    break;
                }

                this.query.updateTimeLeft(param['username'], (status, message) => {
                    if (status !== Config.SUCCESS){
                        res.end(JSON.stringify({"success" : 0, "error" : message}));
                        return
                    }

                    console.log("Update successful");
                    res.end(JSON.stringify({"success" : 1, "error": message}))
                });
                break;
            case '/api/checkTime':
                if (!this.checkUserName(param['username'])) {
                    res.end(JSON.stringify({"success" : 0, "error" : "Invalid username"}));
                    break;
                }

                this.query.checkUserExist(param['username'], (result, err, message) => {
                    if (err !== Config.SUCCESS) {
                        console.log(message)
                        res.end(JSON.stringify({"success" : 0, "error" : message}));
                        return;
                    }
                    res.write(JSON.stringify({"result" : result, "success" : 1, "error" : "None"}))
                    res.end()
                });
                break;

            default:
                break;
        }
        return 0;
    }

    checkUserName(name) {
        if (name == null || name === ""){
            return false;
        }
        return true;
    }

    checkPassword(pass) {
        if (pass == null || pass === "") {
            return false;
        }
        return true;
    }

    run() {
        //do not delete, this is for the callback function to refer back to the current object
        var self = this;
        const running = http.createServer(function (req, res) {
            res.setHeader("Content-Type", "application/json");
            const reqSummary = urlParser.parse(req.url, true);
            self.doAction(reqSummary.pathname, reqSummary.query, res);
        });
        console.log("Server running...");
        running.listen(9000);

    }

    close() {
        running.close(function () {
            console.log("Closing server");
        });
        this.query.exit();
    }




}

module.exports = Server;

