const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "portfolio",
});

const mockAddNote = async (sql, values) => {
  return { insertId: 1 };
};

module.exports = db;
module.exports = { mockAddNote };
