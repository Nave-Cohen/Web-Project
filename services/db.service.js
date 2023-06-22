const mysql = require("mysql2");
const db_config = require("../configs/db.config");
const { Tasks, Task } = require("../entities/task");
const User = require("../entities/user");

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

function getNow() {
  const today = new Date();
  const tzOffset = today.getTimezoneOffset() * 60000;
  const now = new Date(today - tzOffset);
  return now.toISOString().slice(0, 16);
}

/* register users */
async function register(username, email, password) {
  const insertQuery =
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  const selectQuery = "SELECT * FROM users WHERE username = ?";

  try {
    await pool.query(insertQuery, [username, email, password]);
    const [rows] = await pool.query(selectQuery, [username]);
    return rows.length > 0 ? new User(rows[0]) : null;
  } catch (error) {
    return error;
  }
}

/* login users */
async function login(usernameOrEmail, password) {
  return await pool
    .query(
      "SELECT * FROM users WHERE (username = ? OR email = ?) AND password = ?",
      [usernameOrEmail, usernameOrEmail, password]
    )
    .then(([rows]) => {
      return rows.length > 0 ? new User(rows[0]) : null;
    })
    .catch((error) => {
      return error;
    });
}

function getToday() {
  const today = new Date();
  const startDateTime = today.toISOString().slice(0, 10) + " 00:00:00";
  const endDateTime = today.toISOString().slice(0, 10) + " 23:59:59";
  return [startDateTime, endDateTime];
}

async function countTodayTasks(userid) {
  return await pool
    .query(
      "SELECT COUNT(*) as count FROM tasks WHERE uid = ? AND done = 0 AND start >= ? AND start <= ? ",
      [userid].concat(getToday())
    )
    .then(([rows]) => {
      return rows[0].count;
    })
    .catch((error) => {
      return error;
    });
}

async function countUpcomingTasks(userid) {
  const today = new Date();
  const startDateTime = today.toISOString().slice(0, 10) + " 00:00:00";
  return await pool
    .query(
      "SELECT COUNT(*) as count FROM tasks WHERE uid = ? AND done = 0 AND start >= ?",
      [userid, startDateTime]
    )
    .then(([rows]) => {
      return rows[0].count;
    })
    .catch((error) => {
      return error;
    });
}

async function getTodayTasks(userid) {
  return await pool
    .query(
      "SELECT * FROM tasks WHERE uid = ? AND done = 0 AND start >= ? AND start <= ? ORDER BY start ASC",
      [userid].concat(getToday())
    )
    .then(([rows]) => {
      return new Tasks(rows);
    })
    .catch((error) => {
      return error;
    });
}

async function getAllTasks(userid) {
  const today = new Date();
  const startDateTime = today.toISOString().slice(0, 10) + " 00:00:00";
  return await pool
    .query(
      "SELECT * FROM tasks WHERE uid = ? AND start >= ? AND done = 0 ORDER BY start ASC",
      [userid, startDateTime]
    )
    .then(([rows]) => {
      return new Tasks(rows);
    })
    .catch((error) => {
      return error;
    });
}

async function getDoneTasks(userid) {
  return await pool
    .query(
      "SELECT * FROM tasks WHERE uid = ? AND done = 1 ORDER BY start ASC",
      [userid]
    )
    .query(
      "SELECT * FROM tasks WHERE uid = ? AND done = 1 ORDER BY start ASC",
      [userid]
    )
    .then(([rows]) => {
      return new Tasks(rows);
    })
    .catch((error) => {
      return error;
    });
}

async function deleteTask(taskid) {
  return await pool
    .query("DELETE FROM tasks WHERE id = ?", [taskid])
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
    .query("UPDATE `tasks` SET `done` = 1 WHERE `id` = ?", [taskid])
    .then(([rows]) => {
      return rows.affectedRows > 0;
    })
    .catch((error) => {
      return error;
    });
}
async function updateTask(task) {
  return await pool
    .query(
      "UPDATE `tasks` SET title = ?, content = ? ,start = ? ,created = NOW()  WHERE `id` = ?",
      [task.title, task.content, task.start, task.id]
    )
    .query(
      "UPDATE `tasks` SET title = ?, content = ? ,start = ? ,created = NOW()  WHERE `id` = ?",
      [task.title, task.content, task.start, task.id]
    )
    .then(([rows]) => {
      return rows.affectedRows > 0;
    })
    .catch((error) => {
      throw Error(error);
    });
}
async function addTask(uid, task) {
  const insertQuery =
    "INSERT INTO `tasks` (uid, title, content, start, created, done) VALUES (?, ?, ?, ?, NOW(), 0)";
  const selectQuery = "SELECT * FROM tasks WHERE id = LAST_INSERT_ID()";

  try {
    await pool.query(insertQuery, [uid, task.title, task.content, task.start]);
    const [rows] = await pool.query(selectQuery);
    return rows.length > 0 ? new Task(rows[0]) : null;
  } catch (error) {
    return null;
  }
}

async function getCurrentTask(userid) {
  const startDateTime = getNow();
  return await pool
    .query(
      "SELECT id,title FROM tasks WHERE uid = ? AND start = ? AND done = 0",
      [userid, startDateTime]
    )
    .then(([rows]) => {
      return rows.length > 0 ? rows : null;
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
  getDoneTasks,
  countTodayTasks,
  countUpcomingTasks,
  updateTask,
  addTask,
  getCurrentTask,
};
