const userController = require("../Controllers/userController");

const express = require("express");
const router = express.Router();

router.route("/register").post(userController.register);
router.route("/verify").post(userController.verifyCode);

module.exports = router;
