const express = require("express");
const {
  createPaymentMethod,
  getPaymentMethods,
} = require("../controllers/payment");
const { authenticate } = require("../middleware/authenticate");

const Router = express.Router();

Router.post("/methods", authenticate(), createPaymentMethod);
Router.get("/methods/:profile_id", authenticate(), getPaymentMethods);

module.exports = Router;
