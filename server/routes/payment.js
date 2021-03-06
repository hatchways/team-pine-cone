const express = require("express");
const {
  createPaymentMethod,
  getPaymentMethods,
  createConnect,
  validateAccount,
} = require("../controllers/payment");
const { authenticate } = require("../middleware/authenticate");

const Router = express.Router();

Router.post("/methods", authenticate(), createPaymentMethod);
Router.get("/methods", authenticate(), getPaymentMethods);
Router.post("/account", authenticate(), createConnect);
Router.get("/account/validate/:id", authenticate(), validateAccount);

module.exports = Router;
