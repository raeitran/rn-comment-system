const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamp: true }
);

module.exports = mongoose.model("User", userSchema);
