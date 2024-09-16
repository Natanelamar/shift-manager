const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "User must have a user name"],
    unique: [true, "User is already exists"],
  },
  password: {
    type: String,
    required: [true, "User must have a password"],
  },
  email: {
    type: String,
    required: [true, "User must have an email"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
