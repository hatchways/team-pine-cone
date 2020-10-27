const createError = require("http-errors");
const { Request, Profile } = require("../models/");
const socket = require("../utils/socket");

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
    Profile.findById(result.user_id).then(profile => {
      socket.io.to(result.sitter_id.toString()).emit("notification", {
        title: "New Request",
        message: `${profile.firstName} ${profile.lastName} wants you to watch their dog!`
      });
    });
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
  Request.findById(req.params.id).then(request => {
    if (req.body.accepted) {
      request.accept();
      request.save();
    }
    else if (req.body.declined) {
      request.decline();
      request.save();
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
