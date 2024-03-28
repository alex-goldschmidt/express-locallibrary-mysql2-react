var mysql = require("mysql2");
var dotenv = require("dotenv");
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_ROOT,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    dateStrings: true,
  })
  .promise();

pool.getConnection((error, connection) => {
  if (error instanceof Error) throw error;
  console.log("Successfully connected to the database.");
  connection.release();
});

module.exports = pool;
