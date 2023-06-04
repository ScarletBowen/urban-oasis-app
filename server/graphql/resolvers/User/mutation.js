const models = require("../../../models");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function register(root, { username, fullname, password }) {
  try {
    const oldUser = await models.User.findOne({ username });
    if (oldUser) {
      throw new Error("Username already exists");
    }
    const user = await models.User.create({
      username,
      fullname,
      password: await bcrypt.hash(password, 10),
    });
    const token = jwt.sign(
      { user_id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1y" }
    );
    let createdUser = {
      user_id: user._id,
      username: user.username,
    };

    return {
      token,
      user: createdUser,
      message: "Registration succesfull",
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

async function login(_, { username, password }) {
  try {
    const user = await models.User.findOne({ username });
    if (!user) {
      throw new Error("No user with that username");
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Incorrect password");
    }

    // return jwt
    const token = jwt.sign(
      { user_id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return {
      token,
      user: {
        user_id: user._id,
        username: user.username,
      },
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  register,
  login,
};
