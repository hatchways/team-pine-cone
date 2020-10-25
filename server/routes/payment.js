const express = require("express");
const { createPaymentMethod, getPaymentMethods } = require("../controllers/payment");

const Router = express.Router();

Router.post("/payment_methods", createPaymentMethod);
Router.get("/payment_methods/:profile_id", getPaymentMethods);

module.exports = Router;
