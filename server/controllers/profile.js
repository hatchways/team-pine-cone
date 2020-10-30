const createError = require("http-errors");
const { Profile } = require("../models/");
const { User } = require("../models/");
const { validationResult } = require("express-validator");

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
    const options = { new: true, lean: true };
    const profile = await Profile.findByIdAndUpdate(
      id,
      { ...profileProps },
      options
    );

    if (email) {
      await User.findOneAndUpdate(
        { profile: id },
        { email: email.toLowerCase() }
      );
    }

    return res.status(200).json({ profile });
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
    hourlyRateRange = "0,9999",
    fromDate,
    toDate,
    page = 1,
    search = "",
    sortBy = "firstName",
  } = req.query;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json(errors);
  }

  let dateQuery = {};

  if (fromDate && toDate) {
    dateQuery = {
      "availability.start": { $gte: new Date(fromDate) },
      "availability.end": { $lte: new Date(toDate) },
    };
  }

  try {
    const n = 8;
    const [minPrice, maxPrice] = hourlyRateRange.split(",");
    //if performance is an issue resort to text indexes instead
    const reg = new RegExp(search, "i");
    const p = Number(page);

    let [data] = await Profile.aggregate([
      {
        $match: {
          isSitter: true,
          rating: { $gte: Number(rating) },
          $and: [
            { hourlyRate: { $gte: Number(minPrice) } },
            { hourlyRate: { $lte: Number(maxPrice) } },
          ],
          $or: [{ firstName: reg }, { lastName: reg }],
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
          description: { $first: "$jobTitle" },
          hourlyRate: { $first: "$hourlyRate" },
          location: { $first: "$location" },
          photo: { $first: "$photo" },
        },
      },
      { $sort: { [sortBy]: 1, firstName: 1 } },
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
  Profile.findById(req.user.profile)
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
