const express = require("express");
const {
  createPaymentMethod,
  getPaymentMethods,
  createCheckoutSession,
  charge,
} = require("../controllers/payment");
const { authenticate } = require("../middleware/authenticate");

const Router = express.Router();

Router.post("/methods", authenticate(), createPaymentMethod);
Router.get("/methods/:profile_id", authenticate(), getPaymentMethods);
Router.post("/checkout/create", createCheckoutSession);
Router.post("/charge", charge);

module.exports = Router;
