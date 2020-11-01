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

  if (!card_id && !user_id) {
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
      customer: profile.stripeId,
      type: "card",
    });

    return res.status(200).json({ data: paymentMethods.data });
  } catch (err) {
    checkErrors(err, next);
  }
};

const createConnect = async (req, res, next) => {
  const { email, profile: profile_id } = req.user;
  const profile = await req.user.populate("profile");

  let accountId;
  try {
    if (!profile.stripe?.accountId) {
      const account = await stripe.accounts.create({
        type: "custom",
        email: email,
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
      });

      accountId = account.id;

		profile.$set();

      await Profile.findByIdAndUpdate(profile_id, {
        $set: { "stripe.accountId": accountId },
      });
    } else {
      accountId = profile.stripe.accountId;
    }

    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: "http://localhost:3000/me",
      return_url: "http://localhost:3000/me",
      type: "account_onboarding",
    });

    return res.status(201).json({ accountLink });
  } catch (err) {
    checkErrors(err, next);
  }
};

module.exports = {
  createPaymentMethod,
  getPaymentMethods,
  createConnect,
};
