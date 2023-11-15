const db = require('../config/database.js');

const getUserById = async (id) => {
  const [rows] = await db.query('SELECT * FROM users WHERE user_id = ?', [id]);
  console.log(rows);
  return rows[0];
};

const getUserByUsernameAndPassword = async (username, password) => {
  const [rows] = await db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
  console.log(rows);
  return rows[0];
};



const createUser = async (username, password, email) => {
  const [result] = await db.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [
    username,
    password,
    email,
  ]);

  console.log(result);

  const insertedId = result.insertId;

  const user = await getUserById(insertedId);

  return user;
};

module.exports = { createUser, getUserById, getUserByUsernameAndPassword };
