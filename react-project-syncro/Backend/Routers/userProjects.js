//this route is use store user email and all project id user allocate
const express = require('express');
const UserProjects = require('../Modules/UserProjects');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { email } = req.query;
    const userProjects = await UserProjects.findOne({ email: email }).populate('projects');
    if (userProjects) {
      res.json(userProjects);
    } else {
      res.status(404).json({ message: 'No projects found for this user' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
