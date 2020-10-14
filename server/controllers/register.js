const createError = require('http-errors');
const { validationResult } = require('express-validator');
const { User } = require('../models/');
const jwtCookie = require('../utils/jwt');

const registerUser = async (req, res, next) => {
	const {email, password} = req.body;
	const errors = validationResult(req);

	//This should be parameters errors 422
	if (!errors.isEmpty()) {
		return res
			.status(422)
			.json({ errors: errors.array() });
	}

	try {
		const user = await User.createUser(email, password);

		jwtCookie(user, res);

		return res
			.status(201)
			.json({ id: user.id, email: user.email });

	} catch (e) {
		next(createError(500, e.message));
	}
};

module.exports = { registerUser };
