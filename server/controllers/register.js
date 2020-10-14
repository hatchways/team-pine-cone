const {hash} = require('bcryptjs');
const createError = require('http-errors');
const {validationResult} = require('express-validator');
const {User} = require('../models/');

const registerUser = async (req, res, next) => {
	const {email, password} = req.body;
	const errors = validationResult(req);

	//This should be parameters errors 422
	if (!errors.isEmpty()) {
		return res
			.status(422)
			.json({errors: errors.array()});
	}

	try {
		const hashPassword = await hash(password, 10);
	} catch (e) {

	}
};

module.exports = {registerUser};
