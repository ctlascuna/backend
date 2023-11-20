const db = require("../config/database.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getUserById = async (id) => {
  const [rows] = await db.query("SELECT * FROM users WHERE userId = ?", [id]);
  return rows[0];
};

const getUserByUsernameAndPassword = async (username, password) => {
  const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [
    username,
  ]);

  const user = rows[0];

  if (user) {
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      return user;
    }
  }

  return null;
};

const createUser = async (username, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hashedPassword]
    );

    const insertedId = result.insertId;

    const user = await getUserById(insertedId);

    return user;
  } catch (e) {
    throw new Error("Username already exists.");
  }
};

module.exports = {
  createUser,
  getUserById,
  getUserByUsernameAndPassword,
};
