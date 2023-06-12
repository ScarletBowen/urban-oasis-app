const mongoose = require("mongoose");
const placeSchema = require("./Place");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  bio: {
    type: String,
  },
  gender: {
    type: String,
  },
  avatar: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  friend_id: {
    type: String,
    required: true,
  },
  friends: [
    {
      type: String
    },
  ],
  savedPlaces: [{ type: String }],
});

// userSchema.pre('save', async function(next) {
//   if (this.isNew || this.isModified('password')) {
//     const saltRounds = 10;
//     this.password = await bcrypt.hash(this.password, saltRounds);
//   }

//   next();
// });

// userSchema.methods.isCorrectPassword = async function(password) {
//   return await bcrypt.compare(password, this.password);
// };

userSchema.virtual('friendCount').get(function () {
	return this.friends.length;
});

userSchema.virtual('favoriteCount').get(function () {
	return this.savedPlaces.length;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
