const NAME = process.env.ACCESS_TOKEN_NAME;

const logOutUser = (req, res) => {
  res.clearCookie(NAME);
  return res.status(200).json({ user: req.user });
};

module.exports = { logOutUser };
