const createError = require("http-errors");
const { User } = require("../models/");

const getUser = (req, res, next) => {
  if (!req.user) {
    return next(createError(403));
  }

  return res.status(200).json({ user: req.user });
};

module.exports = { getUser };
