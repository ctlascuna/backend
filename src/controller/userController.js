const db = require("../config/database.js");
const jwt = require("jsonwebtoken");

const getUserById = async (id) => {
  const [rows] = await db.query("SELECT * FROM users WHERE userId = ?", [id]);
  return rows[0];
};

const getUserByUsernameAndPassword = async (username, password) => {
  const [rows] = await db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password]
  );
  return rows[0];
};

const createUser = async (username, password) => {
  try {
    const [result] = await db.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, password]
    );

    const insertedId = result.insertId;

    const user = await getUserById(insertedId);

    return user;
  } catch (e) {
    throw new Error("Username already exists.");
  }
};

const generateAccessToken = (user) => {
  const payload = {
    userId: user.userId,
  };

  const accessToken = jwt.sign(
    payload,
    "4afe6577-30db-4485-bbdf-cf80ae2f082a",
    { expiresIn: "30d" }
  );

  return accessToken;
};

module.exports = {
  createUser,
  getUserById,
  getUserByUsernameAndPassword,
  generateAccessToken,
};
