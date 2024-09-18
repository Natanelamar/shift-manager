const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "User must have a user name"],
  },
  password: {
    type: String,
    required: [true, "User must have a password"],
  },
  email: {
    type: String,
    required: [true, "User must have an email"],
    unique: [true, "This email address is already exists"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
