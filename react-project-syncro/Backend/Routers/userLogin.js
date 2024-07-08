const express = require('express');
const router = express.Router();
const User = require('../Modules/userSchema');
const bcrypt = require('bcrypt');

// Login route
router.post('/', async (req, res) => {
  const { userEmail, userPassword } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ userEmail });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(userPassword, user.userPassword);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Successful login
    res.json({ message: 'Login successful!' });

  } catch (err) {
    res.status(400).send('Error: ' + err);
  }
});

module.exports = router;