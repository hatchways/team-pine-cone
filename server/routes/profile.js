const express = require("express");
const { 
  profileCreateValidator, 
  profileUpdateValidator
} = require("../utils/validators/");
const { 
  createProfile, 
  updateProfile, 
  getProfiles,
  getProfile,
  getMyProfile
} = require("../controllers/profile");
const { authenticate } = require("../middleware/authenticate");

const Router = express.Router();

Router.post("/create", profileCreateValidator, createProfile);
Router.put("/:id", profileUpdateValidator, updateProfile);
Router.get("/", getProfiles);
Router.get("/me", authenticate(), getMyProfile);
Router.get("/:id", getProfile);

module.exports = Router;
