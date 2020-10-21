const express = require("express");
const { registerValidators } = require("../utils/validators/");
const { registerUser } = require("../controllers/register");

const Router = express.Router();

Router.post("/", registerValidators, registerUser);

module.exports = Router;
