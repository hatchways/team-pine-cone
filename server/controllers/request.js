const createError = require("http-errors");
const { Request, Profile } = require("../models/");
const stripe = require("stripe");
const { validationResult } = require("express-validator");

const getRequestsByUser = (req, res, next) => {
  if (!req.user) {
    return next(createError(403));
  }

  Profile.findById(req.user.profile_id)
    .populate("requests")
    .then((profile) => {
      res.status(200).json(profile.requests);
    })
    .catch((e) => {
      console.log(e);
      res.status(503).end();
    });
};

const createRequest = (req, res, next) => {
  if (!req.user) {
    return next(createError(403));
  }
  const request = new Request({
    user_id: req.user.profile_id,
    sitter_id: req.body.sitter_id,
    start: req.body.start,
    end: req.body.end,
  });

  request
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((e) => {
      console.log(e);
      res.status(503).end();
    });
};

const updateRequest = (req, res, next) => {
  if (!req.user) {
    return next(createError(403));
  }
  Request.findById(req.body.request_id)
    .then((request) => {
      if (req.body.approved) {
        request.accept().save();
      } else {
        request.decline().save();
      }
      res.status(200).json(request);
    })
    .catch((e) => {
      console.log(e);
      res.status(503).end();
    });
};

const chargeAndPayRequest = async (req, res, next) => {
  const { amount } = req.body;
  const { id: request_id } = req.params;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json(errors);
  }

  try {
    const request = await Request.findById(request_id).populate(
      "user_id sitter_id"
    );
    const { user_id: customer, sitter_id: sitter } = request;

    //need to check if both parties are Stripe customers and have a credit card in the application
    if (!request) return next(createError(404, "Request cannot be found"));
    if (!customer.stripeId)
      return next(createError(422, "Customer does not have a payment method."));
    if (!sitter.stripeId)
      return next(createError(422, "Sitter does not have a payment method"));

    //obtains payment method or main credit card
    const {
      data: [card],
    } = await stripe.paymentMethods.list({
      customer: customer.stripeId,
      type: "card",
    });

    //attempts to create and confirm payment
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "cad",
      customer: customer.stripeId,
      description: "LovingSitter Dog Sitting Service",
      payment_method: card.id,
      //%3 for LovingSitter
      application_fee_amount: amount * 0.03,
      confirm: true,
      //transfers money to sitter
      transfer_data: {
        destinatiom: sitter.stripeId,
      },
    });

    request.pay();
    await request.save();

    return res.status(200).json({ paymentIntent });
  } catch (err) {
    console.log(err);
    if (err.code) {
      return next(createError(400, err.message));
    }
    return next(createError(500));
  }
};

module.exports = {
  getRequestsByUser,
  createRequest,
  updateRequest,
  chargeAndPayRequest,
};
