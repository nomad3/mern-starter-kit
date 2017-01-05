// Importing Passport, strategies, and config
const passport = require('passport'),
      User = require('../models/user'),
      config = require('./main'),
      JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt,
      LocalStrategy = require('passport-local');

const localOptions = {
  usernameField: 'email' // Setting username field to email rather than username
}

//==========================
// LOCAL LOGIN STRATEGY
//==========================
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  User.findOne({ email: email }, function(err, user) {
    if(err) { return done(err); }
    if(!user) {
      return done(null, false, { error: 'No user exists with that email address' });
    }

    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false, { error: "Invalid password" }); }
      return done(null, user);
    });
  });
});

//==========================
// JWT AUTHORIZATION STRATEGY
//==========================
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),   // Telling Passport to check authorization headers for JWT
  secretOrKey: config.secret   // Telling Passport where to find the secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload._doc._id, function(err, user) {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);
