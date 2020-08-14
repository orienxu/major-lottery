const { Connection, Request } = require("tedious");

'use strict';

const express = require('express');

// Constants
const PORT = 3000;
const HOST = '127.0.0.1';

// App
const app = express();

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

// Create connection to database
const config = {
  authentication: {
    options: {
      userName: "orien",
      password: "Xcy123123"
    },
    type: "default"
  },
  server: "drawmajor.database.windows.net",
  options: {
    database: "major",
    encrypt: true
  }
};

const connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on("connect", err => {
  if (err) {
    console.error(err.message);
  } else {
    queryDatabase();
  }
});

function queryDatabase() {
  console.log("Reading rows from the Table...");

  // Read all rows from table
  const request = new Request(
    `SELECT *
     FROM Users`,
    (err, rowCount) => {
      if (err) {
        console.error(err.message);
      } else {
        // console.log(`${rowCount} row(s) returned`);
      }
    }
  );

  request.on("row", columns => {
    app.get('/', (req, res) => {
      let textHold = '';
      columns.forEach(column => {
        // console.log("%s\t%s", column.metadata.colName, column.value);
        textHold += (column.metadata.colName + ' ' + column.value + '\n');
      });
      res.send(textHold);
    });
  });

  connection.execSql(request);
}