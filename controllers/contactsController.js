// contactsController.js

const db = require('../models'); 
const Contact = db.Contact;
const User = db.User;

// Controller function to get all contacts for a user
exports.getAllContactsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const contacts = await Contact.findAll({
      where: { userId },
    });

    res.json(contacts);
  } catch (error) {
    console.error('Error retrieving contacts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to create a new contact for a user
exports.createContactForUser = async (req, res) => {
  const { userId } = req.params;
  const { firstName, lastName, email, phoneNumber } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const contact = await Contact.create({ firstName, lastName, email, phoneNumber, userId });

    res.status(201).json(contact);
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to update a contact for a user
exports.updateContactForUser = async (req, res) => {
  const { userId, contactId } = req.params;
  const { firstName, lastName, email, phoneNumber } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const contact = await Contact.findOne({
      where: { id: contactId, userId },
    });
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    await contact.update({ firstName, lastName, email, phoneNumber });

    res.json(contact);
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to delete a contact for a user
exports.deleteContactForUser = async (req, res) => {
  const { userId, contactId } = req.params;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const contact = await Contact.findOne({
      where: { id: contactId, userId },
    });
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    await contact.destroy();

    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
