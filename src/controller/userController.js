const db = require('../config/database.js');
const jwt = require('jsonwebtoken');

const getUserById = async (id) => {
  const [rows] = await db.query('SELECT * FROM users WHERE user_id = ?', [id]);
  return rows[0];
};

const getUserByUsernameAndPassword = async (username, password) => {
  const [rows] = await db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
  return rows[0];
};



const createUser = async (username, password) => {
  try { 
    
    const [result] = await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [
      username,
      password,
    ]);

    const insertedId = result.insertId;

    const user = await getUserById(insertedId);

    return user;
  } catch(e) {
    throw new Error('Username already exists.');
  }
};

const generateAccessToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
  };

  const accessToken = jwt.sign(payload, 'your-secret-key', { expiresIn: '1m' });

  return accessToken;
};

module.exports = { createUser, getUserById, getUserByUsernameAndPassword, generateAccessToken };
