const models = require("../../../models");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function register(root, { firstName, lastName, email, password }) {
  try {
    const oldUser = await models.User.findOne({ email });
    if (oldUser) {
      throw new Error("Email or Employee id already exists");
    }
    const user = await models.User.create({
      firstName,
      lastName,
      email,
      password: await bcrypt.hash(password, 10),
    });
    const token = jwt.sign(
      { user_id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1y" }
    );
    let createdUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
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

async function login(_, { email, password }) {
  try {
    const user = await models.User.findOne({ email });

    if (!user) {
      throw new Error("No user with that email");
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Incorrect password");
    }

    // return jwt
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return {
      token,
      user,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  register,
  login,
};
