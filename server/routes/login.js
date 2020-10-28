const express = require("express");
const { loginValidators } = require("../utils/validators/");
const { loginUser } = require("../controllers/login");

const Router = express.Router();

Router.post("/", loginValidators, loginUser);

module.exports = Router;
