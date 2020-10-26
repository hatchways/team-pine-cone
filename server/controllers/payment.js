const STRIPE_SECRECT = process.env.STRIPE_SECRET;
const stripe = require("stripe")(STRIPE_SECRECT);
const createError = require("http-errors");
const { User } = require("../models/");
const { Profile } = require("../models/");

const checkErrors = (err, next) => {
  if (err.code) {
    return next(createError(err.code, err.message));
  }
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
    console.log(err);
    checkErrors(err, next);
  }
};

const getPaymentMethods = async (req, res, next) => {
  const { profile_id } = req.params;

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
	//validators
	const { price } = req.body;

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		mode: "payment",
		line_items: [
			{ 
				quantity: 1,
				amount: price,
				currency: "cad",
				description: "dog sitting service",
			}
		],
		success_url: ``,
		cancel_url: ``
	});
};

module.exports = { createPaymentMethod, getPaymentMethods };
