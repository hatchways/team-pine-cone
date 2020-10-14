const { check } = require('express-validator');

const registerValidators = [
	check('email')
		.isEmail()
		.normalizeEmail(),
	check('password')
		.isLength({ min: 6 })
		.withMessage('Password must contain at least 6 characters.')
];

module.exports = { registerValidators };
