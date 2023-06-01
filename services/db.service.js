const mysql = require("mysql2");
const db_config = require("../configs/db.config");

const pool = mysql.createPool(db_config.options).promise();

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

module.exports = { register, login, pool };
