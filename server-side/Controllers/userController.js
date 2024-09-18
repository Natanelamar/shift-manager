const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/usersModel"); // Your User model
const transporter = require("../config/mailerConfig");
const jwt = require("jsonwebtoken");

let verificationCodes = {};

exports.register = async (req, res) => {
  // No need to manually call validationResult here, it should be handled by the validation middleware
  const { username, password, email } = req.body;
  console.log(req.body);
  console.log(username, password, email);

  try {
    // Step 3: Generate and store a verification code
    const confirmationCode = Math.floor(100000 + Math.random() * 900000);
    verificationCodes[username] = { confirmationCode, password };

    // Step 4: Send a verification email
    const mailOptions = {
      from: '"Shift Manager" <noreply@shiftmanager.com>',
      to: email,
      subject: "Confirm your registration",
      text: `Your confirmation code is: ${confirmationCode}`,
    };

    await transporter.sendMail(mailOptions);

    // Step 5: Render a response to prompt the user to verify
    return res.status(200).json({
      message: "A verification email has been sent to your email address.",
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.verifyCode = async (req, res) => {
  const { username, code } = req.body;

  // Validate the verification code
  if (
    verificationCodes[username] &&
    verificationCodes[username].confirmationCode == code
  ) {
    try {
      // Encrypt the password and save the user
      const passwordToHash = verificationCodes[username].password;
      const hashedPassword = await bcrypt.hash(passwordToHash, 10);
      const newUser = new User({
        username,
        email: req.body.email,
        password: hashedPassword,
      });
      await newUser.save();

      // Clear the stored verification code
      delete verificationCodes[username];

      return res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error saving user:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    return res.status(400).json({ error: "dfgdsfgdfgdfsgdsgdsfgdfsg123123" });
  }
};
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // שלב 1: חיפוש המשתמש במסד הנתונים
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "User not registered" });
    }

    // שלב 2: השוואת הסיסמה המוצפנת עם הסיסמה שנשלחה
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // שלב 3: יצירת טוקן JWT עם מזהה המשתמש
    const token = jwt.sign(
      { userId: user._id, username: user.username }, // המידע שיכנס לטוקן
      process.env.JWT_SECRET, // הסוד ששומר על האבטחה (מאוכסן ב-`config.env`)
      { expiresIn: "1h" } // הגבלת זמן לטוקן (במקרה הזה שעה)
    );

    // שלב 4: החזרת הטוקן כתגובה
    return res.status(200).json({
      message: "Login successful",
      token: token, // הטוקן שנשלח ללקוח
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
