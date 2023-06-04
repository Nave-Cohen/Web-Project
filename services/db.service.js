const mysql = require("mysql2");
const db_config = require("../configs/db.config");

class PoolSingleton {
  constructor() {
    this.pool = mysql.createPool(db_config.options).promise();
  }

  static getInstance() {
    if (!PoolSingleton.instance) PoolSingleton.instance = new PoolSingleton();
    return PoolSingleton.instance.pool;
  }
}

const pool = PoolSingleton.getInstance();

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
//TODO: get all tasks orderd by date [not done], get all task order by date [done]
//TODO: add task, remove task
module.exports = { register, login, pool };
