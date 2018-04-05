const passport = require('passport');
const { ExtractJwt } = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;

const config = require('./config');

module.exports.initAuth = () => {
  const options = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = config.JWT_SECRET;

  const strategy = new JwtStrategy(options, (payload, done) =>
    done(null, payload)
  );

  passport.use(strategy);
};
