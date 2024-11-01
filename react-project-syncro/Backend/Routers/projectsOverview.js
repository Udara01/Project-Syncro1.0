const express = require('express');
const router = express.Router();
const UserProjects = require('../Modules/UserProjects'); // Adjust the path as needed
const Project = require('../Modules/projectSchema'); // Import your Project schema


// Route to get all projects with their statuses for a specific user
router.get('/user-projects/status/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const userProjects = await UserProjects.findOne({ email }).populate('projects');

    if (!userProjects) {
      return res.status(404).json({ message: 'User not found or no projects assigned' });
    }

    const statusCount = userProjects.projects.reduce((acc, project) => {
      const status = project.status || "Unknown"; // Default to "Unknown" if status is missing
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
    

    console.log("Status Count:", statusCount); // Debug to verify output
    res.json({ statusCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


const User = require('../Modules/UserSchema'); // Import User schema

// Endpoint to get projects for a specific user
router.get('/user-projects/:userId', async (req, res) => {

  try {
    const userId = req.params.userId;

    // Get user email by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userEmail = user.email;

    const userProjects = await UserProjects.findOne({ email: userEmail }).populate('projects');
    if (!userProjects) return res.status(404).json({ message: 'User not found' });

    // Retrieve project details including team members' usernames only
    const projectDetails = await Project.find({ _id: { $in: userProjects.projects } })
      .populate({
        path: 'teamMembers',
        select: 'username' // Only include the 'username' field of team members
      });

    res.json({ projects: projectDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;

