const { check } = require('express-validator');

const registerValidators = [
	check('email', 'Email is required')
		.isEmail()
		.normalizeEmail(),
	check('password', 'Password is required')
		.isLength({ min: 6 })
		.withMessage('Password must contain at least 6 characters.')
];

module.exports = { registerValidators };
