const jwt = require('jsonwebtoken');

const NAME = process.env.ACCESS_TOKEN_NAME;
const SECRET = process.env.ACCESS_TOKEN_SECRET;
const LIFE = process.env.ACCESS_TOKEN_LIFE;

const jwtCookie = ({ email, id }, res) => {
	const token = jwt.sign(
		{ id, email, role: 'user' },
		SECRET,
		{ expiresIn: LIFE }
	);

	res.cookie(
		NAME,
		token,
		{ httpOnly: true, sameSite: true }
	);
};

module.exports = { jwtCookie };
