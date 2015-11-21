var FacebookStrategy = require('passport-facebook').Strategy;
var passport = require('passport');
var configAuth = require('./auth.js');
var usersHelper = require('../lib/usersHelper');

// TODO: Serialize/deserialize user
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(new FacebookStrategy({
  clientID: configAuth.facebookAuth.clientID,
  clientSecret: configAuth.facebookAuth.clientSecret,
  callbackURL: configAuth.facebookAuth.callbackURL
}, function (token, refreshToken, profile, done) {
  process.nextTick(function () {
    usersHelper.findOrCreateUser(profile)
      .then( function (user) {
        console.log('added user to db, ', user.toJSON());
        done(null, user.toJSON());
      });
  });

}));

module.exports = passport;
