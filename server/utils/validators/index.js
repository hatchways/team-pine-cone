const { check } = require('express-validator');

const profileValidator = [
	check('firstName', 'First name required')
		.exists()
		.trim()
		.isAlpha()
		.withMessage('First names may only contain letters'),
	check('lastName', 'Last name required')
		.exists()
		.trim()
		.isAlpha()
		.withMessage('Last names may only contain letters'),
	check('birthDate')
		.optional()
		.isDate()
		.withMessage('Birthday is not a date')
];

module.exports = { profileValidator };
