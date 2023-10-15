const express = require('express');
const router = express.Router();

const userController = require('../controllers/users');
const {
  createUserValidation,
  loginUserValidation,
} = require('../validation/userValidation');

router.post('/signup', createUserValidation, userController.createUser);

router.post('/login', loginUserValidation, userController.validateUser);

module.exports = router;
