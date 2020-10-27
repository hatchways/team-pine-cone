const STRIPE_SECRECT = process.env.STRIPE_SECRET;
const stripe = require("stripe")(STRIPE_SECRECT);
const createError = require("http-errors");
const { User, Profile, Request } = require("../models/");

const checkErrors = (err, next) => {
  if (err.code) {
    return next(createError(err.code, err.message));
  }
  console.error(err.message);
  next(createError(500));
};

//Edit this controller to add multiple cards
//currently supports only one credit card
const createPaymentMethod = async (req, res, next) => {
  const { card_id, user_id } = req.body;

  if (!card_id && !user_id) {
    return next(createError(422, "customer_id or profile_id not provided"));
  }

  try {
    const user = await User.findById(user_id).populate("profile");
    if (!user) return next(createError(404, "User not found"));

    let { profile } = user;
    let customer;

    //updates current card to new card
    if (profile.stripeId) {
      const { data: cards } = await stripe.paymentMethods.list({
        customer: profile.stripeId,
        type: "card",
      });

      const card = cards[0];

      await stripe.paymentMethods.detach(card.id);
      await stripe.paymentMethods.attach(card_id, {
        customer: profile.stripeId,
      });
      //if no card found creates new customer and new card
    } else {
      customer = await stripe.customers.create({
        description: "LovingSitter customer",
        email: user.eamil,
        name: profile.firstName + " " + profile.lastName,
        phone: profile.phone,
        payment_method: card_id,
      });

      profile = await Profile.findByIdAndUpdate(
        profile._id,
        { stripeId: customer.id },
        { new: true }
      );
    }

    return res.status(201).json({ ...profile.toJSON() });
  } catch (err) {
    checkErrors(err, next);
  }
};

const getPaymentMethods = async (req, res, next) => {
  const { profile_id } = req.params;

  if (!profile_id) return next(createError(422, "profile_id not provided"));

  try {
    const profile = await Profile.findById(profile_id).populate("profile");
    if (!profile) return next(createError(404, "Profile not found"));

    if (!profile.stripeId) return res.status(200).json({ data: [] });

    const paymentMethods = await stripe.paymentMethods.list({
      customer: profile.stripeId,
      type: "card",
    });

    return res.status(200).json({ data: paymentMethods.data });
  } catch (err) {
    checkErrors(err, next);
  }
};

const createCheckoutSession = async (req, res, next) => {
  const { price } = req.body;

  if (!price) return next(createError(422, "price is not provided"));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: "Dog Sitting",
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      success_url: `http://localhost:3001/payment/success`,
      cancel_url: `http://localhost:3001/me`,
    });

    res.json({ id: session.id });
  } catch (err) {
    checkErrors(err, next);
  }
};

const charge = async (req, res, next) => {
  const { amount, request_id } = req.body;
  const user = req.user;

  try {
    const request = await Request.findById(request_id).populate(
      "user_id sitter_id"
    );
    const { user_id: customer, sitter_id: sitter } = request;

    if (!request) return next(createError(404, "Request cannot be found"));
    if (!customer.stripeId)
      return next(createError(422, "Customer does not have a payment method."));
    if (!sitter.stripeId)
      return next(createError(422, "Sitter does not have a payment method"));

    const {
      data: [card],
    } = await stripe.paymentMethods.list({
      customer: customer.stripeId,
      type: "card",
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "cad",
      customer: sitter.stripeId,
      description: "LovingSitter Dog Sitting Service",
      payment_method: card.id,
      application_fee_amount: amount * 0.03,
      confirm: true,
      transfer_data: {
        destinatiom: customer.stripeId,
      },
    });

    return res.status(200).json({ paymentIntent });
  } catch (err) {
    console.log(err);
    checkErrors(err, next);
  }
};

module.exports = {
  createPaymentMethod,
  getPaymentMethods,
  createCheckoutSession,
  charge,
};
