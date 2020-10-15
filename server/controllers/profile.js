const createError = require('http-errors');
const { Profile } = require('../models/');
const { validationResult } = require('express-validator');

const createProfile = async (req, res, next) => { 
	const profileProps = req.body;
	const errors = validationResult(req);

	if (!errors.isEmpty()) { 
		return res
			.status(422)
			.json({ errors });
	}

	try { 
		const profile = await Profile.create({ ...profileProps });

		return res
			.status(201)
			.json({ profile });

	} catch (err) { 
		console.log(err);
		next(createError(500, err.message));
	}
};

const getProfiles = (req, res, next) => { 
};

module.exports = { createProfile };
