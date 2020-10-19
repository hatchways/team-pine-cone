const createError = require("http-errors");
const { Request, Profile } = require("../models/");

const getRequestsByUser = (req, res, next) => {
  if (!req.user) {
    return next(createError(403));
  }

  Profile.findById(req.user.profile_id).populate("requests").then(profile => {
    res.status(200).json(profile.requests);
  });
};