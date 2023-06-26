/* eslint-disable no-undef */
require("dotenv").config();

const options = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 4,
  maxIdle: 4,
};

module.exports.options = options;
module.exports.JWTTOKEN = process.env.JWTTOKEN;
