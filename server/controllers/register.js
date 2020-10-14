const createError = require('http-errors');
const { validationResult } = require('express-validator');
const { User } = require('../models/');
const { jwtCookie } = require('../utils/jwt');

const registerUser = async (req, res, next) => {
	const {email, password} = req.body;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return next(createError(422, 'Email and password are both required.'));
	}

	try {
		const user = await User.createUser(email, password);

		jwtCookie(user, res);

		return res
			.status(201)
			.json({ user: { 
				id: user.id,
				email: user.email
			}});

	} catch (err) {
		//check monggoose error code for email duplication
		if (err.code === 11000) {
			return next(createError(422, 'Email is already taken.'));
		}

		next(createError(500, err.message));
	}
};

module.exports = { registerUser };
