const createError = require("http-errors");
const { Request, Profile } = require("../models/");

const getRequestsByUser = (req, res, next) => {
  if (!req.user) {
    return next(createError(403));
  }

  Profile.findById(req.user.profile).populate("requests").then(profile => {
    res.status(200).json(profile.requests);
  }).catch(e => {
    console.log(e);
    res.status(503).end();
  });
};

const createRequest = (req, res, next) => {
  if (!req.user) {
    return next(createError(403));
  }
  const request = new Request({
    user_id: req.user.profile,
    sitter_id: req.body.sitter_id,
    start: req.body.start,
    end: req.body.end
  });

  request.save().then(result => {
    res.status(200).json(result);
  }).catch(e => {
    console.log(e);
    res.status(503).end();
  });
};

const updateRequest = (req, res, next) => {
  if (!req.user) {
    return next(createError(403));
  }
  Request.findById(req.body.request_id).then(request => {
    if (req.body.approved) {
      request.accept().save();
    }
    else {
      request.decline().save();
    }
    res.status(200).json(request);
  }).catch(e => {
    console.log(e);
    res.status(503).end();
  });
};

module.exports = {
  getRequestsByUser,
  createRequest,
  updateRequest
};