const { check } = require("express-validator");
const { Profile } = require("../../models/");

const genders = Profile.schema.paths.gender.enumValues;

const checkGender = check("gender")
  .optional()
  .custom((value) => {
    return genders.includes(value);
  })
  .withMessage("Provide valid gender value");

const checkBirthDate = check("birthDate")
  .optional()
  .isISO8601()
  .withMessage("Invalid date, must be in ISO86061 format");

const checkFirstName = check("firstName", "First name required")
  .exists()
  .trim()
  .matches(/^[a-zA-Z']+$/)
  .withMessage("First names may only contain letters");

const checkLastName = check("lastName", "Last name required")
  .exists()
  .trim()
  .matches(/^[a-zA-Z']+$/)
  .withMessage("Last names may only contain letters");

const checkEmail = check("email", "Email is required").isEmail();

const checkPassword = check("password", "Password is required")
  .isLength({ min: 6 })
  .withMessage("Password must contain at least 6 characters.");

const profileCreateValidator = [
  checkFirstName,
  checkLastName,
  checkGender,
  checkBirthDate,
];

const profileUpdateValidator = [checkGender, checkBirthDate];

const registerValidators = [checkFirstName, checkLastName];

const loginValidators = [checkEmail, checkPassword];

module.exports = {
  profileCreateValidator,
  profileUpdateValidator,
  registerValidators,
  loginValidators,
};
