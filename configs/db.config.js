require("dotenv").config();

const options = {
  host: process.env.DB_HOST || process.env.DB_CONFIG.host,
  user: process.env.DB_USER || process.env.DB_CONFIG.user,
  password: process.env.DB_PASS || process.env.DB_CONFIG.password,
  database: process.env.DB_DATABASE || process.env.DB_CONFIG.database,
};

module.exports.options = options;
module.exports.jwtToken = process.env.jwtSecret;
