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

Router.get("/requests", authenticate(), getRequestsByUser);

Router.post("/request", authenticate(), createRequest);

Router.put("/request/:id", authenticate(), updateRequest);

Router.post(
  "/request/:id/pay",
  authenticate(),
  requestChargePayValidators,
  chargeAndPayRequest
);
