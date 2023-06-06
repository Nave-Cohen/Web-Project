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

async function getTodayTasks(userid) {
  const date = new Date().toISOString().split("T")[0];
  return await pool
    .query(
      "SELECT * FROM tasks WHERE uid = ? AND done = 0 AND created = ? ORDER BY start ASC",
      [userid, date]
    )
    .then(([rows]) => {
      return rows.length > 0 ? rows : [];
    })
    .catch((error) => {
      return error;
    });
}

async function getAllTasks(userid) {
  return await pool
    .query(
      "SELECT * FROM tasks WHERE uid = ? AND done = 0 ORDER BY start ASC",
      [userid]
    )
    .then(([rows]) => {
      return rows.length > 0 ? rows : null;
    })
    .catch((error) => {
      return error;
    });
}

async function deleteTask(taskid) {
  return await pool
    .query("DELETE FROM tasks WHERE id = ?", [taskid])
    .then(([rows]) => {
      return rows.affectedRows > 0;
    })
    .catch((error) => {
      return error;
    });
}

async function finishTask(taskid) {
  return await pool
    .query("UPDATE `tasks` SET `done` = 1 WHERE `id` = ?", [taskid])
    .then(([rows]) => {
      return rows.affectedRows > 0;
    })
    .catch((error) => {
      return error;
    });
}

//TODO: add task
module.exports = {
  register,
  login,
  pool,
  getAllTasks,
  deleteTask,
  finishTask,
  getTodayTasks,
};
