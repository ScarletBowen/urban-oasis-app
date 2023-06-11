const jwt = require("jsonwebtoken");
const models = require("../models");

const expiration = "1d";

function getSecretKey() {
  return process.env.JWT_SECRET || "mysecretsshhhhh";
}

function generateToken(userId, username) {
  return jwt.sign(
    {
      user_id: userId,
      username: username,
    },
    getSecretKey(),
    {
      expiresIn: expiration,
    }
  );
}

async function authMiddleware({ req, res }) {
  // Get the user token from the headers.
  var token = req.headers.authorization || "";

  if (token.includes("Bearer")) {
    token = token.split(" ").pop().trim();
  }

  if (!token) {
    return req;
  }

  var userId;
  try {
    const decoded = jwt.verify(token, getSecretKey());
    userId = decoded.user_id;
  } catch (err) {
    console.error(err);
    throw err;
  }

  // Try to retrieve a user with the token
  const user = await models.User.findOne({ _id: userId });

  // Add the user to the context
  return { user };
}

module.exports = {
  generateToken,
  authMiddleware,
};
