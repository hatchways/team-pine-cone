const express = require("express");
const { getUser } = require("../controllers/user");
const { authenticate } = require("../middleware/authenticate");

const Router = express.Router();

Router.get("/me", authenticate(), getUser);

module.exports = Router;
