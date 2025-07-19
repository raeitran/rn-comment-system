const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Comments", commentSchema);
