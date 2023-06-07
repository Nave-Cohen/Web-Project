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
  const tasksQuery = pool.query(
    "SELECT * FROM tasks WHERE uid = ? AND done = 0 AND created = ? ORDER BY start ASC",
    [userid, date]
  );

  const otherQuery = pool.query(
    "SELECT * FROM tasks WHERE uid = ? AND done = 1 AND created = ? ORDER BY start ASC",
    [userid, date]
  );

  try {
    const [tasksResult, otherResult] = await Promise.all([
      tasksQuery,
      otherQuery,
    ]);

    const tasks = tasksResult[0].length > 0 ? tasksResult[0] : [];
    const doneTasks = otherResult[0].length > 0 ? otherResult[0] : [];

    return { tasks, doneTasks };
  } catch (error) {
    return error;
  }
}

async function getAllTasks(userid) {
  const tasksQuery = pool.query(
    "SELECT * FROM tasks WHERE uid = ? AND done = 0 ORDER BY start ASC",
    [userid]
  );

  const otherQuery = pool.query(
    "SELECT * FROM tasks WHERE uid = ? AND done = 1 ORDER BY start ASC",
    [userid]
  );

  try {
    const [tasksResult, otherResult] = await Promise.all([
      tasksQuery,
      otherQuery,
    ]);

    const tasks = tasksResult[0].length > 0 ? tasksResult[0] : [];
    const doneTasks = otherResult[0].length > 0 ? otherResult[0] : [];

    return { tasks, doneTasks };
  } catch (error) {
    return error;
  }
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
