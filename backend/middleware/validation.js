const { body, validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

const registerValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  body('referralCode')
    .optional()
    .isLength({ min: 6, max: 6 })
    .withMessage('Referral code must be 6 characters long')
];

const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const depositValidation = [
  body('amount')
    .isFloat({ min: 10, max: 1500 })
    .withMessage('Deposit amount must be between $10 and $1500'),
  body('txHash')
    .isLength({ min: 64, max: 64 })
    .withMessage('Invalid transaction hash')
];

const withdrawalValidation = [
  body('amount')
    .isFloat({ min: 1 })
    .withMessage('Withdrawal amount must be at least $1'),
  body('toAddress')
    .isLength({ min: 34, max: 34 })
    .withMessage('Invalid TRON address')
];

module.exports = {
  validateRequest,
  registerValidation,
  loginValidation,
  depositValidation,
  withdrawalValidation
};