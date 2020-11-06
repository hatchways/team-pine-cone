const STRIPE_SECRET = process.env.STRIPE_SECRET;
const createError = require("http-errors");
const { Request, Profile } = require("../models/");
const { validationResult } = require("express-validator");
const stripe = require("stripe")(STRIPE_SECRET);
const notifier = require("../utils/notification");
const Conversation = require("../models/Conversation");
const socket = require("../utils/socket");

const getRequestsByUser = (req, res, next) => {
  if (!req.user) {
    return next(createError(403));
  }

  Profile.findById(req.user.profile)
    .populate("requests")
    .then((profile) => {
      res.status(200).json(profile.requests);
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
    if (!customer.stripe.customerId)
      return next(createError(422, "Customer does not have a payment method."));
    //credit card
    if (!sitter.stripe.accountId)
      return next(
        createError(422, "Sitter does not have a linked Stripe account")
      );

    const sitterAccount = await stripe.accounts.retrieve(
      sitter.stripe.accountId
    );
    if (!sitterAccount.details_submitted)
      return next(createError(403, "Sitter account details are incomplete"));

    //obtains payment method or main credit card
    const {
      data: [card],
    } = await stripe.paymentMethods.list({
      customer: customer.stripe.customerId,
      type: "card",
    });

    const stripeAmount = Math.ceil(amount / 0.01);
    const appFee = Math.ceil((stripeAmount / 0.01) * 0.03);

    //attempts to create and confirm payment
    const paymentIntent = await stripe.paymentIntents.create({
      amount: stripeAmount,
      currency: "cad",
      customer: customer.stripe.customerId,
      description: "LovingSitter Dog Sitting Service",
      payment_method: card.id,
      //%3 for LovingSitter
      application_fee_amount: appFee,
      confirm: true,
      //transfers money to sitter
      transfer_data: {
        destination: sitter.stripe.accountId,
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

const createRequest = (req, res, next) => {
  if (!req.user) {
    return next(createError(403));
  }
  const request = new Request({
    user_id: req.user.profile,
    sitter_id: req.body.sitter_id,
    start: req.body.start,
    end: req.body.end,
  });
  request
    .save()
    .then((result) => {
      Profile.findById(result.user_id).then((profile) => {
        notifier.notify(result.sitter_id, {
          title: "New Request",
          message: `${profile.firstName} ${profile.lastName} wants you to watch their dog!`,
          src: profile.photo,
          link: "/my-jobs",
        });
      });
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
  Request.findById(req.params.id)
    .then((request) => {
      if (req.body.accepted) {
        request.accept();
        request.save();
        const conversation = new Conversation({
          user_id: request.user_id,
          sitter_id: request.sitter_id,
          request_id: request._id,
          messages: [],
        });
        conversation.save().then((conversation) => {
          Profile.findById(conversation.user_id)
            .populate("requests")
            .populate({
              path: "conversations",
              populate: {
                path: "messages",
                model: "Message",
              },
            })
            .then((profile) => {
              socket.io.to(profile._id.toString()).emit("update", profile);
            });
          Profile.findById(conversation.sitter_id)
            .populate("requests")
            .populate({
              path: "conversations",
              populate: {
                path: "messages",
                model: "Message",
              },
            })
            .then((profile) => {
              socket.io.to(profile._id.toString()).emit("update", profile);
            });
        });
      } else if (req.body.declined) {
        Request.findByIdAndRemove(req.params.id)
          .then(() => {
            res.status(204).end();
          })
          .catch((e) => {
            console.log(e);
            res.status(503).end();
          });
      } else if (req.body.rating) {
        request.fulfillComplete(Number(req.body.rating));
        Profile.findById(req.user.profile).then((profile) => {
          notifier.notify(request.sitter_id, {
            title: "Booking Fulfilled",
            message: `Your job for ${profile.firstName} ${profile.lastName} is done. Thank you for being a LovingSitter!`,
            src: profile.photo,
            link:
              req.user.profile === request.user_id ? "/my-jobs" : "/my-sitters",
          });
        });
        return Request.findByIdAndRemove(request._id).then(() =>
          res.json(204).end()
        );
      }
      const notifyId =
        req.user.profile.toString() === request.user_id.toString()
          ? request.sitter_id
          : request.user_id;
      Profile.findById(req.user.profile)
        .populate("requests")
        .populate({
          path: "conversations",
          populate: {
            path: "messages",
            model: "Message",
          },
        })
        .then((profile) => {
          notifier.notify(notifyId, {
            title: `Booking ${req.body.accepted ? "Accepted" : "Declined"}`,
            message: `${req.body.accepted ? "Yay!" : "Sorry!"} ${
              profile.firstName
            } ${profile.lastName} ${
              req.body.accepted ? "accepted" : "declined"
            } your booking.`,
            src: profile.photo,
            link:
              req.user.profile === request.user_id ? "/my-jobs" : "/my-sitters",
          });
        });
      res.status(200).json(request);
    })
    .catch((e) => {
      console.log(e);
      res.status(503).end();
    });
};

module.exports = {
  getRequestsByUser,
  createRequest,
  updateRequest,
  chargeAndPayRequest,
};
