const { body } = require('express-validator');

// וולידציה לרישום משתמש חדש
const registerValidation = [
  body('username').notEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('email').isEmail().withMessage('Email must be valid')
];

// וולידציה להתחברות
const loginValidation = [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

module.exports = { registerValidation, loginValidation };

