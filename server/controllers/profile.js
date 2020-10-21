const createError = require('http-errors');
const { Profile } = require('../models/');
const { User } = require('../models/');
const { validationResult } = require('express-validator');

const checkDateErrors = err => ['Date ranges', 'User must be 18']
	.some(str => err.message.includes(str));

const createProfile = async (req, res, next) => { 
	const profileProps = req.body;
	const errors = validationResult(req);

	if (!errors.isEmpty()) { 
		return res
			.status(422)
			.json(errors);
	}

	try { 
		const profile = await Profile.create({ ...profileProps });

		return res
			.status(201)
			.json({ profile });

	} catch (err) { 
		if (!err.status) { 
			if (checkDateErrors(err)) { 
				return next(createError(422, err.message));
			}
		}

		next(createError(500, err.message));
	}
};

const updateProfile = async (req, res, next) => { 
	const { id } = req.params;
	const { email, ...profileProps } = req.body;
	const errors = validationResult(req);

	if (!errors.isEmpty()) { 
		return res
			.status(422)
			.json(errors)
	}

	try { 
		const options = { new: true, lean: true };
		const profile = await Profile.findByIdAndUpdate(
			id, 
			{ ...profileProps }, 
			options
		);

		if (email) { 
			await User.findOneAndUpdate(
				{ profile: id }, 
				{ email: email.toLowerCase() }
			);
		}

		return res.status(200).json({ profile });
	} catch (err) { 
		if (!err.status) { 
			if (checkDateErrors(err)) { 
				return next(createError(422, err.message));
			}
		}

		next(createError(500, err.message));
	}
};

const getProfiles = async (req, res, next) => { 
	try { 
		const profiles = await Profile.find();

		return res.status(200).json({ profiles });
	} catch (err) { 
		next(createError(500, err.message));
	}
};

const getProfile = async (req, res, next) => { 
	const { id } = req.params;

	try { 
		let profile = null;

		try { 
			profile = await Profile.findById(id);
		} catch (err) { 
			return next(createError(422, 'Id is invalid'));
		}

		if (!profile) { 
			return next(createError(404, 'Profile not found'));
		}

		return res.status(200).json(profile);
	} catch (err) { 
		next(createError(500, err.message));
	}
}

const getMyProfile = (req, res, next) => {
	if (!req.user) {
		next(createError(403));
	}
	Profile.findById(req.user.profile).then(profile => {
		res.json(profile);
	}).catch(e => {
		console.log(e);
		next(createError(503));
	})
}

module.exports = { createProfile, updateProfile, getProfile, getProfiles, getMyProfile };
