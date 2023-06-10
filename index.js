require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models'); 
const contactsRouter = require('./routes/contacts');
const usersRouter = require('./routes/users');
const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');




const app = express();

// Setup middlewares
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
};

passport.use(
  new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    // Here, you can verify and retrieve the user based on the JWT payload
    // and call the 'done' callback to indicate success or failure
    db.User.findByPk(jwtPayload.userId)
      .then(user => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch(err => done(err, false));
  })
);



// Initialize Sequelize and synchronize models with the database
db.sequelize
  .sync()
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

// Contacts Routes


app.use(
  '/contacts',
  passport.authenticate('jwt', { session: false }),
  contactsRouter
);

// Users Routes
app.use('/', usersRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});
