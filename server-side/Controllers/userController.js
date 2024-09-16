const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/usersModel"); // Your User model
const transporter = require("../config/mailerConfig");

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
    return res.status(400).json({ error: "Invalid verification code" });
  }
};
