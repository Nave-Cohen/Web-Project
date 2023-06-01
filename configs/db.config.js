require("dotenv").config();

const options = {
  host: process.env.DB_HOST || process.env.GITHUB_DB_HOST,
  user: process.env.DB_USER || process.env.GITHUB_DB_USER,
  password: process.env.DB_PASS || process.env.GITHUB_DB_PASS,
  database: process.env.DB_DATABASE || process.env.GITHUB_DB_DATABASE,
};

module.exports.options = options;
module.exports.jwtToken = process.env.jwtSecret;
