const mysql = require("mysql2");
const fs = require("fs");
require("dotenv").config();

function buildDB() {
  const options = {
    host: process.env.DB_HOST || process.env.GITHUB_DB_HOST,
    user: process.env.DB_USER || process.env.GITHUB_DB_USER,
    password: process.env.DB_PASS || process.env.GITHUB_DB_PASS,
  };

  /* create database */
  const connection = mysql.createConnection(options);

  const sqlDump = fs.readFileSync(
    __dirname + "/../configs/Todo_nodeJs_data.sql",
    "utf-8"
  );
  const sqlStatement = sqlDump.split(";");
  sqlStatement.forEach((statement) => {
    statement = statement.trim();
    if (statement !== 0 && !statement.match(/\/\*/)) {
      connection.query(statement, function (err, res) {
        return;
      });
    }
  });
  connection.end();
  console.log("*** database build successfully. ***");
}

buildDB();
