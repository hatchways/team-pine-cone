const NAME = process.env.ACCESS_TOKEN_NAME;

const logOutUser = (req, res, next) => {
  res.clearCookie(NAME);
  return res.status(200).end();
};

module.exports = { logOutUser };
