const userController = require("../Controllers/userController");
const bcrypt = require("bcrypt");

const express = require("express");
const router = express.Router();

// router.route("/login").post(userController.login);
router.route("/register").post(userController.register);

module.exports = router;
