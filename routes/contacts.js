// routes/contacts.js

const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');

// Get all contacts for a user
router.get('/users/:userId/contacts', contactsController.getAllContactsByUser);

// Create a new contact for a user
router.post('/users/:userId/contacts', contactsController.createContactForUser);

// Update a contact for a user
router.put('/users/:userId/contacts/:contactId', contactsController.updateContactForUser);

// Delete a contact for a user
router.delete('/users/:userId/contacts/:contactId', contactsController.deleteContactForUser);

module.exports = router;
