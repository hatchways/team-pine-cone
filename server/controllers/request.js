const createError = require("http-errors");
const { Request, Profile } = require("../models/");
const notifier = require("../utils/notification");

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
      notifier.notify(result.sitter_id, {
        title: "New Request",
        message: `${profile.firstName} ${profile.lastName} wants you to watch their dog!`,
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
    const notifyId = req.user.profile === request.user_id ? request.sitter_id : request.user_id;
    Profile.findById(req.user.profile).then(profile => {
      notifier.notify(notifyId, {
        title: `Booking ${req.body.accepted ? "Accepted" : "Declined"}`,
        message: `${req.body.accepted ? "Yay!" : "Sorry!"} ${profile.firstName} ${profile.lastName} ${req.body.accepted ? "accepted" : "declined"} your booking.`,
      });
    });
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
