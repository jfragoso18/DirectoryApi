// auth.js

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

passport.use(
  new LocalStrategy((username, password, done) => {
    // Find the user in the database
    User.findOne({ where: { username } })
      .then((user) => {
        // User not found
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }

        // Check the password
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        // Authentication successful
        return done(null, user);
      })
      .catch((err) => done(err));
  })
);

// Serialize and deserialize user functions
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then((user) => done(null, user))
    .catch((err) => done(err));
});

module.exports = passport;
