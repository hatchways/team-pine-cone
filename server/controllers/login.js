const createError = require('http-errors');
const { validationResult } = require('express-validator');
const { User } = require('../models/');
const { jwtCookie } = require('../utils/jwt/');

const loginUser = async (req, res, next) => {
	const { email, password } = req.body;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return next(createError(422, 'Email and password are both required.'));
	}
	
	try {
		const user = await User.findOne({email: email.toLowerCase()});

		if (!user) {
			return next(createError(404, 'User not found.'));
		}

		const passwordsMatch = await user.verifyPassword(password);

		if (!passwordsMatch) {
			return next(createError(403));
		}

		jwtCookie(user, res);

		return res
			.status(200)
			.json({ id: user.id, email: user.email });
	} catch (err) {
		next(createError(500, err.message));
	}
};

module.exports = { loginUser };
