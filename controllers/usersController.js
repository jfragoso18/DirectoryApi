// usersController.js

const db = require('../models'); 
const Contact = db.Contact;
const User = db.User;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    res.json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Unable to create user' });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Unable to retrieve users' });
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ error: 'Unable to retrieve user' });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findByPk(req.params.id);
    if (user) {
      user.username = username;
      user.password = password;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Unable to update user' });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Unable to delete user' });
  }
};

// Controller function to get all users with their contacts
exports.getAllUsersWithContacts = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [Contact],
    });

    res.json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to get a user by ID with their contacts
exports.getUserByIdWithContacts = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id, {
      include: [Contact],
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  
    try {
      // Find the user by email
      const user = await User.findOne({ where: { username } });
  
      // Check if user exists and compare the password
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'your-secret-key', {
        expiresIn: '1h',
      });
    
      res.json({ token });
  
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

exports.logout = async(req,res) => {
  // Clear the session data and destroy the session
  req.session.destroy((error) => {
    if (error) {
      console.error('Error logging out:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }

    // Clear the session cookie in the response
    res.clearCookie('session');

    res.json({ message: 'Logout successful' });
  });
};