const userController = require("../Controllers/userController");
const validation = require("../middlewares/validation");
const express = require("express");
const router = express.Router();

router.route("/register").post(userController.register);
router.route("/verify").post(userController.verifyCode);
router.route("/login").post(userController.login); // ודא ש'login' מוגדרת כמו שצריך

module.exports = router;
