const { ExtractJwt } = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;

const config = require('./config');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = config.JWT_SECRET;

const auth = new JwtStrategy(options, (payload, done) => {
  done(null, payload);
});

module.exports = auth;
