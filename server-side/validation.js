const { body } = require('express-validator');

const registerValidation = [
  body('username')
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),

  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

module.exports = { registerValidation };
