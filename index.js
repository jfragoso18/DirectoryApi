const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models'); 
const contactsRouter = require('./routes/contacts');
const usersRouter = require('./routes/users');

const app = express();
app.use(bodyParser.json());



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
app.use('/', contactsRouter);

// Users Routes
app.use('/', usersRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});
