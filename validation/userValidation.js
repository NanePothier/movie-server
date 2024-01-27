const { body, check } = require('express-validator');
const bcrypt = require('bcryptjs');

const userActions = require('../data/users');

exports.createUserValidation = [
  check('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom(async (value) => {
      const allUsers = await userActions.getAllUsers();
      const user = allUsers.find((user) => user.email === value);

      if (user) {
        throw new Error(
          'User with this email already exists. Could not create user.'
        );
      }
    }),
  body('password')
    .trim()
    .isLength({ min: 8 })
    .withMessage('Password needs to be at least 8 characters long.'),
  body('confirmPassword').custom(async (value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match. Could not create user.');
    }
  }),
  body('firstName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage(
      'Invalid first name. First name must be between 1 and 50 characters.'
    ),
  body('lastName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage(
      'Invalid last name. Last name must be between 1 and 50 characters.'
    ),
  body('birthday')
    .trim()
    .isLength({ min: 8, max: 10 })
    .withMessage('Invalid date of birth.'),
  body('planId').trim().isLength({ min: 1 }),
];

exports.loginUserValidation = [
  check('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom(async (value, { req }) => {
      const allUsers = await userActions.getAllUsers();
      const user = allUsers.find((user) => user.email === value);

      if (!user) {
        throw new Error('User with given email does not exist.');
      }

      const isMatch = await bcrypt.compare(req.body.password, user.password);

      if (!isMatch) {
        throw new Error('Password is incorrect.');
      }
    }),
];
