const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, "..", ".env");

function validateEnv() {
  const hasEnv = fs.existsSync(envPath);
  if (hasEnv) {
    return true;
  }
  console.error("Error: .env file missing");
  return false;
}

function updateScript() {
  require("dotenv").config();
  const scriptPath = path.join(__dirname, "init.sql");
  const scriptSql = fs.readFileSync(scriptPath, "utf8");
  let scriptArray = scriptSql.split(/\r?\n/);
  scriptArray[0] = `CREATE DATABASE  IF NOT EXISTS \`${process.env.MYSQL_DATABASE}\` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;`;
  scriptArray[1] = `USE \`${process.env.MYSQL_DATABASE}\``;
  fs.writeFileSync(scriptPath, scriptArray.join("\r\n"));
}

if (validateEnv()) {
  updateScript();
  process.exit(0);
} else {
  process.exit(1);
}
