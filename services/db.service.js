const mysql = require("mysql2");
const db_config = require("../configs/db.config");

const pool = mysql.createPool(db_config.options).promise();

/* create user table if not exist */
async function create_user_table() {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.query(`CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT,
      username VARCHAR(255) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      PRIMARY KEY (id)
    )`);
  } catch (error) {
    console.error("Error creating users table:", error);
  }
}

/* create task table if not exist */
async function create_task_table() {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.query(`CREATE TABLE IF NOT EXISTS tasks (
      id INT AUTO_INCREMENT,
      uid INT,
      title VARCHAR(255),
      content VARCHAR(255),
      created DATE,
      PRIMARY KEY (id),
      FOREIGN KEY (uid) REFERENCES users(id)
    )`);
  } catch (error) {
    console.error("Error creating tasks table:", error);
  }
}

/* register users */
async function register(username, email, password) {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.query(
      "INSERT INTO users (username,email,password) VALUES (?,?,?)",
      [username, email, password]
    );
    return true;
  } catch (error) {
    return false;
  }
}

/* login users */
async function login(usernameOrEmail, password) {
  let connection;
  try {
    connection = await pool.getConnection();
    const [user] = await connection.query(
      "SELECT * FROM users WHERE (username = ? OR email = ?) AND password = ?",
      [usernameOrEmail, usernameOrEmail, password]
    );
    if (user.length > 0) {
      return user[0];
    }
    return null;
  } catch (error) {
    console.error("Error logging in:", error);
    return null;
  }
}

async function initializeDatabase() {
  try {
    await create_user_table(); // must come before task
    await create_task_table();
  } catch (error) {
    console.error("Error initializing database:", error);
  } finally {
    await pool.end();
  }
}

initializeDatabase();

module.exports = { register, login, pool };
