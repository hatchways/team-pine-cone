const createError = require("http-errors");
const { Profile } = require("../models/");
const { User } = require("../models/");
const { validationResult } = require("express-validator");
const NodeGeocoder = require("node-geocoder");

const MAP_QUEST_KEY = process.env.MAP_QUEST_KEY;

const nodeGeocoderOptions = {
  provider: "mapquest",
  apiKey: MAP_QUEST_KEY,
};

const checkDateErrors = (err) =>
  ["Date ranges", "User must be 18"].some((str) => err.message.includes(str));

const createProfile = async (req, res, next) => {
  const profileProps = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json(errors);
  }

  try {
    const profile = await Profile.create({ ...profileProps });

    return res.status(201).json({ profile });
  } catch (err) {
    if (!err.status) {
      if (checkDateErrors(err)) {
        return next(createError(422, err.message));
      }
    }

    next(createError(500, err.message));
  }
};

const updateProfile = async (req, res, next) => {
  const { id } = req.params;
  const { email, ...profileProps } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json(errors);
  }

  try {
    let profile = await Profile.findById(id);

    if (!profile) {
      return next(createError(404, "Profile not found"));
    }

    if (profileProps.address !== profile.address) {
      const [area] = await NodeGeocoder(nodeGeocoderOptions).geocode(
        profileProps.address
      );
      const { stateCode, city, latitude, longitude } = area;
      profileProps.address = `${city}, ${stateCode}`;
      profileProps.location = {
        type: "Point",
        coordinates: [latitude, longitude],
      };
    }

    profile.$set(profileProps);
    await profile.save();

    if (email) {
      await User.findOneAndUpdate(
        { profile: id },
        { email: email.toLowerCase() }
      );
    }

    return res.status(200).json(profile);
  } catch (err) {
    if (!err.status) {
      if (checkDateErrors(err)) {
        return next(createError(422, err.message));
      }
    }

    next(createError(500, err.message));
  }
};

const getProfiles = async (req, res, next) => {
  const {
    rating = 0,
    hourlyRateRange = "0,50",
    fromDate,
    toDate,
    page = 1,
    search = "",
    searchBy = "name",
  } = req.query;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json(errors);
  }

  let dateQuery = {};
  let searchByQuery = {};
  let sort = "firstName";

  if (fromDate && toDate) {
    dateQuery = {
      "availability.start": { $gte: new Date(fromDate) },
      "availability.end": { $lte: new Date(toDate) },
    };
  }

  try {
    const n = 8;
    const [minPrice, maxPrice] = hourlyRateRange.split(",");
    const reg = new RegExp(".*" + search + ".*", "i");
    const p = Number(page);
    const ratingN = Number(rating);

    if (searchBy === "name") {
      searchByQuery = { $or: [{ firstName: reg }, { lastName: reg }] };
    } else if (searchBy === "location") {
      searchByQuery = { address: reg };
    }

    if (searchBy === "location") {
      sort = "address";
    }

    let [data] = await Profile.aggregate([
      {
        $match: {
          isSitter: true,
          rating: { $gte: ratingN },
          $and: [
            { hourlyRate: { $gte: Number(minPrice) } },
            { hourlyRate: { $lte: Number(maxPrice) } },
          ],
          ...searchByQuery,
        },
      },
      { $unwind: "$availability" },
      {
        $match: {
          ...dateQuery,
        },
      },
      {
        $group: {
          _id: "$_id",
          availability: { $push: "$availability" },
          firstName: { $first: "$firstName" },
          lastName: { $first: "$lastName" },
          rating: { $first: "$rating" },
          description: { $first: "$description" },
          jobTitle: { $first: "$jobTitle" },
          hourlyRate: { $first: "$hourlyRate" },
          address: { $first: "$address" },
          photo: { $first: "$photo" },
        },
      },
      { $sort: { [sort]: 1 } },
      {
        $facet: {
          metadata: [
            { $count: "total" },
            { $addFields: { page, isMore: { $gte: ["$total", n * p] } } },
          ],
          profiles: [{ $skip: (p - 1) * n }, { $limit: n }],
        },
      },
    ]);

    return res.status(200).json({ ...data });
  } catch (err) {
    next(createError(500, err.message));
  }
};

const getProfile = async (req, res, next) => {
  const { id } = req.params;

  if (id !== "me") {
    try {
      let profile = null;

      try {
        profile = await Profile.findById(id);
      } catch (err) {
        return next(createError(422, "Id is invalid"));
      }

      if (!profile) {
        return next(createError(404, "Profile not found"));
      }
      return res.status(200).json(profile);
    } catch (err) {
      next(createError(500, err.message));
    }
  }
};

const getMyProfile = (req, res, next) => {
  if (!req.user) {
    next(createError(403));
  }
  Profile.findById(req.user.profile).populate("requests")
    .then((profile) => {
      res.status(200).json(profile);
    })
    .catch((e) => {
      console.log(e);
      next(createError(503));
    });
};

module.exports = {
  createProfile,
  updateProfile,
  getProfile,
  getProfiles,
  getMyProfile,
};
