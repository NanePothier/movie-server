const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const userActions = require('../data/users');
const { User } = require('../models/User');

exports.createUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({
        errors: errors.array(),
      });
    } else {
      const email = req.body.email;
      const password = req.body.password;
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const birthday = req.body.birthday;
      const planId = req.body.planId;

      const hashedPassword = await bcrypt.hash(password, 12);

      await userActions.createUser(
        new User(email, hashedPassword, firstName, lastName, birthday, planId)
      );

      res.status(201).json({
        message: 'User created successfully.',
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.validateUser = (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({
        errors: errors.array(),
      });
    } else {
      req.session.isLoggedIn = true;
      req.session.user = new User(req.body.user, req.body.password);

      res.json({
        message: 'Login was successful.',
      });
    }
  } catch (error) {
    next(error);
  }
};
