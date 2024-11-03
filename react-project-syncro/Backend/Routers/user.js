// routes/user.js
/*const express = require('express');
const router = express.Router();
const User = require('../Modules/UserSchema');
const multer = require('multer');

// Endpoint to find user by email
router.get('/users/find-by-email', async (req, res) => {
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


// Configure multer for file upload
const upload = multer({ dest: 'uploads/' });

// Route to update user profile
    router.put('/users/profile/:id', upload.single('profilePicture'), async (req, res) => {
        try {
          const { firstName, lastName, username, email, role, bio } = req.body;
          const profilePicture = req.file ? req.file.path : null;
      
          const updateData = {
            firstName,
            lastName,
            username,
            email,
            role,
            bio,
          };
      
          if (profilePicture) {
            updateData.profilePicture = profilePicture;
          }
      
          const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
          );
      
          res.json(updatedUser);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Failed to update user' });
        }
      });



module.exports = router;*/


// routes/user.js
const express = require('express');
const router = express.Router();
const User = require('../Modules/UserSchema');
const multer = require('multer');
const path = require('path');

// Configure multer for file upload with proper storage settings
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Endpoint to find user by email
router.get('/users/find-by-email', async (req, res) => {
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

// Route to update user profile with profile picture
router.put('/users/profile/:id', upload.single('profilePicture'), async (req, res) => {
  try {
    const { firstName, lastName, username, email, role, bio } = req.body;
    const profilePicture = req.file ? `/uploads/${req.file.filename}` : null;

    const updateData = {
      firstName,
      lastName,
      username,
      email,
      role,
      bio,
    };

    if (profilePicture) {
      updateData.profilePicture = profilePicture;
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update user' });
  }
});



// Route to get all users
router.get('/members', async (req, res) => {
  try {
    // Find all users and exclude the password field
    const users = await User.find({}, '-password');
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching members' });
  }
});


// Route to get user profile by ID
router.get('/users/profile/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id, '-password');
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



router.get('/users/status/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json({ isOnline: user.isOnline, lastActive: user.lastActive });
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
});



// routes/user.js
router.put('/users/upstatus/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.lastActive = Date.now();
      await user.save();
      res.status(200).json({ message: 'Status updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

