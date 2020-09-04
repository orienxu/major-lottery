const http = require('http');
const propertiesReader = require('properties-reader');
const properties = propertiesReader('./api/dbconn.properties');
const urlParser = require('url');
const Query = require('./Query');



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
            host: "ec2-18-222-142-130.us-east-2.compute.amazonaws.com",
            user: "root1",
            password: "123",            
            database: "MajorLottery",
            port: 3306
        });
        this.query.init();
    }

    doLogin(username, password) {
        //TODO
    }

    doRegister(username, password) {
        //TODO
    }

    // doGenerateNewCard(username) {
    //     //TODO
    // }

    doAction(action, param) {
        switch(action) {
            case '/login':
                //Note: key on param depends on the param structure and how u name the input
                this.doLogin(param["username"], param["password"]);
                //TODO return 
                break;
            case '/register':
                this.doRegister(param["username"], param["password"]);
                //TODO
                break;
            case '/generateNewCard':
                //TODO
                break;
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
            console.log("request coming in...");
            let result = self.doAction(reqSummary.pathname, reqSummary.query);
            //TODO write response base on doAction result in JSON format;
            res.end();
        });
        console.log("Server running");
        running.listen(9000);
        
    }

    

    

    
}

module.exports = Server;

