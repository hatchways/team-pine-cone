const { check, param } = require("express-validator");
const { Profile } = require("../../models/");
const { Types } = require("mongoose");

const genders = Profile.schema.paths.gender.enumValues;

const checkGender = check("gender")
  .optional()
  .custom(value => { 
    return genders.includes(value);
  })
  .withMessage("Provide valid gender value");

const checkBirthDate = check("birthDate")
  .optional()
  .isISO8601()
  .withMessage("Invalid date, must be in ISO86061 format");

const profileCreateValidator = [
  check("firstName", "First name required")
    .exists()
    .trim()
    .isAlpha()
    .withMessage("First names may only contain letters"),
  check("lastName", "Last name required")
    .exists()
    .trim()
    .isAlpha()
    .withMessage("Last names may only contain letters"),
  checkGender,
  checkBirthDate
];

const profileUpdateValidator = [
  checkGender,
  checkBirthDate
];

const registerValidators = [
  check("email", "Email is required")
    .isEmail()
    .normalizeEmail(),
  check("password", "Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters.")
];

module.exports = { profileCreateValidator, profileUpdateValidator, registerValidators };
