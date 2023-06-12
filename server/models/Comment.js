const mongoose = require("mongoose");
const { Schema } = require('mongoose');


const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: true
    },
    username: {
      type: String,
      ref: 'User',
      required: true
    },
    place: {
      type: String,
      ref: 'Place',
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    author: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        immutable: true
      }
    ]
  },
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;