const express = require("express");
const { logOutUser } = require("../controllers/logout");
const { authenticate } = require("../middleware/authenticate");

const Router = express.Router();

Router.post("/", authenticate(), logOutUser);

module.exports = Router;
