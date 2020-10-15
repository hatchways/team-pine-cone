const express = require('express');
const { profileValidator } = require('../utils/validators/');
const { createProfile } = require('../controllers/profile');

const Router = express.Router();

Router.post('/create', profileValidator, createProfile);

module.exports = Router;
