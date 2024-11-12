// backend/controllers/auth.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { findUserByUsername } = require('../models/User');

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Check if user exists
    const user = findUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Send token as response
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = login;