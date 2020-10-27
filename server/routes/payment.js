const express = require("express");
const {
  createPaymentMethod,
  getPaymentMethods,
  createCheckoutSession,
} = require("../controllers/payment");
const { authenticate } = require("../middleware/authenticate");

const Router = express.Router();

Router.post("/methods", authenticate(), createPaymentMethod);
Router.get("/methods/:profile_id", authenticate(), getPaymentMethods);
//might not need checkout
Router.post("/checkout/create", authenticate(), createCheckoutSession);

module.exports = Router;
