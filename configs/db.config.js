/* eslint-disable no-undef */
require("dotenv").config();

const options = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
};

module.exports.options = options;
module.exports.JWTTOKEN = process.env.JWTTOKEN;
