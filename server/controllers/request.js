const { Request, Profile } = require("../models/");

const getRequestsByUser = (req, res) => {

  Profile.findById(req.user.profile).populate("requests").then(profile => {
    res.status(200).json(profile.requests);
  }).catch(e => {
    console.log(e);
    res.status(503).end();
  });
};

const createRequest = (req, res) => {
  const request = new Request({
    user_id: req.user.profile,
    sitter_id: req.body.sitter_id,
    start: req.body.start,
    end: req.body.end
  });

  request.save().then(result => {
    addRequestToProfile(result, result.user_id);
    addRequestToProfile(result, result.sitter_id);
    res.status(200).json(result);
  }).catch(e => {
    console.log(e);
    res.status(503).end();
  });
};

const updateRequest = (req, res) => {
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

function addRequestToProfile(result, id) {
  Profile.findById(id).then(profile => {
    profile.requests.push(result);
    profile.save();
  });
}
