const passport = require('passport');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;

module.exports.initAuth = () => {
  const options = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = process.env.JWT_SECRET;

  const strategy = new JwtStrategy(options, (payload, done) => {
    return done(null, payload);
  });

  passport.use(strategy);
};
