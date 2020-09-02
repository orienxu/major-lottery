const sql = require('mssql');

class Query {
    constructor(config) {
        this.config = config;
        this.pool = null;
    }

    init() {
        this.pool = new sql.ConnectionPool(this.config);
        this.pool.connect(function (err) {
            if (err) console.log(err);            
        });
    }

    logIn(username, passwd){

    }

    register(username, passwd){

    }

    updateUserCard(username) {
        
    }

    exit() {
        this.pool.close();
    }
}

module.exports = Query;