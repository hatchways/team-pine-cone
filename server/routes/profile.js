const express = require("express");
const { 
  profileCreateValidator, 
  profileUpdateValidator
} = require("../utils/validators/");
const { 
  createProfile, 
  updateProfile, 
  getProfiles,
  getProfile
} = require("../controllers/profile");

const Router = express.Router();

Router.post("/create", profileCreateValidator, createProfile);
Router.put("/:id", profileUpdateValidator, updateProfile);
Router.get("/", getProfiles);
Router.get("/:id", getProfile);

module.exports = Router;
