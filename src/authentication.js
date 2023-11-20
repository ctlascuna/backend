const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const verifyAsync = promisify(jwt.verify);

const secretKey = "4afe6577-30db-4485-bbdf-cf80ae2f082a";

const getUserByToken = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const decodedToken = await verifyAsync(token, secretKey);

    const userId = decodedToken.userId;

    return { userId: userId };
  } catch (error) {
    return null;
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

module.exports = { getUserByToken, generateAccessToken };
