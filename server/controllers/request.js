const createError = require("http-errors");
const { Request, Profile } = require("../models/");
const { Types } = require("mongoose");

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
  if (req.body.approved) {
    Request.findById(req.params.id)
      .then((request) => {
        request.accept().save();
        res.status(200).json(request);
      })
      .catch((e) => {
        console.log(e);
        res.status(503).end();
      });
  } else if (req.body.declined) {
    Request.findByIdAndRemove(req.params.id).then(() => {
      res.status(204).end();
    }).catch(e => {
      console.log(e);
      res.status(503).end();
    });
  }
};

module.exports = {
  getRequestsByUser,
  createRequest,
  updateRequest,
};
