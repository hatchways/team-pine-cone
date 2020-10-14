const express = require('express');
const {check} = require('express-validator');
const {registerUser} = require('../controllers/register');

const Router = express.Router();

const postRegisterValidator = [
	check('email', 'Email is required.')
		.isEmail()
		.normalizeEmail(),
	check('password', 'Password is required.')
		.isLength({min: 6})
		.withMessage('Password must contain at least 6 characters.')
];

Router.post('/register', postRegisterValidator, registerUser);

module.exports = Router;
