// routes/users.js

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Create a new user
router.post('/', usersController.createUser);

// Get all users
router.get('/', usersController.getAllUsers);

// Get a single user by ID
router.get('/:id', usersController.getUserById);

// Update a user
router.put('/:id', usersController.updateUser);

// Delete a user
router.delete('/:id', usersController.deleteUser);

// Get all users with their contacts
router.get('/users', usersController.getAllUsersWithContacts);

// Get a user by ID with their contacts
router.get('/users/:id', usersController.getUserByIdWithContacts);


module.exports = router;
