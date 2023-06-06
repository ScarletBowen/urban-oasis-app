const mongoose = require("mongoose");
const placeSchema = require("./Place");

const userSchema = new mongoose.Schema({
  username: { type: String, default: null },
  fullname: { type: String, default: null },
  password: { type: String },
});

module.exports = mongoose.model("users", userSchema);
