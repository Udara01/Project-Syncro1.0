// routes/user.js
const express = require('express');
const router = express.Router();
const User = require('../Modules/UserSchema');

// Endpoint to find user by email
router.get('/find-by-email', async (req, res) => {
    const { email } = req.query;
    try {
        const user = await User.findOne({ email });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
