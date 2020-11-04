const STRIPE_SECRET = process.env.STRIPE_SECRET;
const stripe = require("stripe")(STRIPE_SECRET);
const createError = require("http-errors");
const { User, Profile } = require("../models/");

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

  if (!card_id || !user_id) {
    return next(createError(422, "card_id or profile_id not provided"));
  }

  try {
    let { email, profile } = await User.findById(user_id).populate("profile");

    let customer;

    //updates current card to new card
    if (profile.stripe.customerId) {
      const { data: cards } = await stripe.paymentMethods.list({
        customer: profile.stripe.customerId,
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
        email: email,
        name: profile.firstName + " " + profile.lastName,
        phone: profile.phone,
        payment_method: card_id,
      });

      profile = await Profile.findByIdAndUpdate(
        profile._id,
        { $set: { "stripe.customerId": customer.id } },
        { new: true }
      );
    }

    return res.status(201).json({ ...profile.toJSON() });
  } catch (err) {
    checkErrors(err, next);
  }
};

const getPaymentMethods = async (req, res, next) => {
  const { profile: profile_id } = req.user;

  if (!profile_id) return next(createError(422, "profile_id not provided"));

  try {
    const profile = await Profile.findById(profile_id);
    if (!profile) return next(createError(404, "Profile not found"));

    if (!profile.stripe.customerId) return res.status(200).json({ data: [] });

    const paymentMethods = await stripe.paymentMethods.list({
      customer: profile.stripe.customerId,
      type: "card",
    });

    return res.status(200).json({ data: paymentMethods.data });
  } catch (err) {
    checkErrors(err, next);
  }
};

const createLink = (accountId) =>
  stripe.accountLinks.create({
    account: accountId,
    refresh_url: process.env.RETURN_PAYMENT_LINK,
    return_url: process.env.RETURN_PAYMENT_LINK,
    type: "account_onboarding",
  });

const createConnect = async (req, res, next) => {
  const { email, profile: profile_id } = req.user;
  let accountLink;

  try {
    const profile = await Profile.findById(profile_id);

    //new account
    if (!profile.stripe || !profile.stripe.accountId) {
      const account = await stripe.accounts.create({
        type: "express",
        email: email,
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
      });

      await Profile.findByIdAndUpdate(profile_id, {
        $set: { "stripe.accountId": account.id },
      });

      accountLink = await createLink(account.id);

      return res.status(201).json({ accountLink: accountLink.url });
    }

    const account = await stripe.accounts.retrieve(profile.stripe.accountId);

    //unfinished account
    if (!account.details_submitted) {
      accountLink = await createLink(account.id);
      //validated account
    } else {
      accountLink = await stripe.accounts.createLoginLink(
        profile.stripe.accountId
      );
    }

    return res.status(201).json({ accountLink: accountLink.url });
  } catch (err) {
    checkErrors(err, next);
  }
};

const validateAccount = async (req, res, next) => {
  const { id: profile_id } = req.params;
  if (!req.params) return next(createError(422, "No param id provided"));

  const profile = await Profile.findById(profile_id);
  const account = await stripe.accounts.retrieve(profile.stripe.accountId);

  if (!account.details_submitted)
    return next(createError(403, "Stripe account details are incomplete"));

  return res.status(200).json(account);
};

module.exports = {
  createPaymentMethod,
  getPaymentMethods,
  createConnect,
  validateAccount,
};
