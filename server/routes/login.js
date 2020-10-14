const express = require('express');
const { check } = require('express-validator');
const { registerValidators } = require('../utils/validators/');
const { loginUser } = require('../controllers/login');

const Router = express.Router();
const loginValidators = registerValidators;

Router.post('/', loginValidators, loginUser);

module.exports = Router;
