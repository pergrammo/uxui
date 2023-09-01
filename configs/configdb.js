const mysql = require("mysql");
const dotenv = require("dotenv").config();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST2,
  user: process.env.DB_USER2,
  password: process.env.DB_PWD2,
  database: process.env.DB_NAME2,
  debug: false
});

module.exports = { pool };
