const passport = require("passport");
const passportJWT = require("passport-jwt");
const createError = require("http-errors");
const { User } = require("../models/");

const { ExtractJwt, Strategy } = passportJWT;
const NAME = process.env.ACCESS_TOKEN_NAME;
const SECRET = process.env.ACCESS_TOKEN_SECRET;

const cookieExtractor = (req) => req && req.cookies[NAME];

const params = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: SECRET,
};

//If succeeds a user object will be created at req.user
const strategy = new Strategy(params, function (payload, done) {
  return User.findById(payload.id)
    .then((user) => (user ? done(null, user) : done(createError(403), null)))
    .catch((err) => done(createError(500, err.message), false));
});

passport.use(strategy);

const initializeAuthentication = () => passport.initialize();
const authenticate = () =>
  passport.authenticate("jwt", {
    session: false,
  });

module.exports = { initializeAuthentication, authenticate };
