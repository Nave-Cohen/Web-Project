// Sets up and exports a middleware function for managing sessions
// Manage and store session data in a MySQL database

const sessions = require("express-session");
const mysqlStore = require("express-mysql-session")(sessions);
const { pool } = require("./db.service");
const db_config = require("../configs/db.config");

const day = 1000 * 60 * 60 * 24;
module.exports = sessions({
  store: new mysqlStore(db_config.options, pool),
  secret: db_config.JWTTOKEN,
  resave: false,
  saveUninitialized: false,
  cookie: {
    domain: '.taskify.space', // Set the domain attribute to share cookies across subdomains
    maxAge: day,
    secure: true,
    httpOnly: true,
  },
});
