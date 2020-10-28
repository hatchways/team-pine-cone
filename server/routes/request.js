const express = require("express");
const { authenticate } = require("../middleware/authenticate");
const {
  getRequestsByUser,
  createRequest,
  updateRequest,
  chargeAndPayRequest,
} = require("../controllers/request");
const { requestChargePayValidators } = require("../utils/validators/");

const Router = express.Router();

Router.post(
  "/request/:id/pay",
  authenticate(),
  requestChargePayValidators,
  chargeAndPayRequest
);

Router.get("/me", authenticate(), getRequestsByUser);

Router.post("/create", authenticate(), createRequest);

Router.put("/update/:id", authenticate(), updateRequest);

module.exports = Router;
