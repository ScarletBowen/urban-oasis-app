const models = require("../../../models");

async function getUser(root, args, { user }) {
  try {
    if (!user) throw new Error("You are not authenticated!");
    // TODO: update later
    return await models.User.findAll({ username: "abc" });
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  getUser,
};
