const mysql = require("mysql2");
const fs = require("fs");
const db_config = require("../configs/db.config");

const pool = mysql.createPool(db_config.options).promise();
/* create database */

function createDataBase() {
  const sqlDump = fs.readFileSync(
    __dirname + "/../tests/db/Todo_nodeJs_data.sql",
    "utf-8"
  );
  const sqlStatement = sqlDump.split(";\n");
  sqlStatement.forEach((statement) => {
    statement = statement.trim();
    if (statement !== 0 && !statement.match(/\/\*/)) {
      pool.query(statement);
    }
  });
}

/* register users */
async function register(username, email, password) {
  return await pool
    .query("INSERT INTO users (username,email,password) VALUES (?,?,?)", [
      username,
      email,
      password,
    ])
    .then(([rows]) => {
      return rows.affectedRows > 0;
    })
    .catch((error) => {
      return error;
    });
}

/* login users */
async function login(usernameOrEmail, password) {
  return await pool
    .query(
      "SELECT * FROM users WHERE (username = ? OR email = ?) AND password = ?",
      [usernameOrEmail, usernameOrEmail, password]
    )
    .then(([rows]) => {
      return rows.length > 0 ? rows[0] : null;
    })
    .catch((error) => {
      return error;
    });
}

async function initializeDatabase() {
  try {
    createDataBase();
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

initializeDatabase();

module.exports = { register, login, pool };
