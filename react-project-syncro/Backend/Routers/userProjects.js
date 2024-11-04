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


const Project = require('../Modules/projectSchema');

// Route to get team members for projects assigned to a specific user
router.get('/user-projects/:email/teams', async (req, res) => {
  try {
      // Step 1: Find the projects associated with the user’s email
      const userProjects = await UserProjects.findOne({ email: req.params.email });
      
      if (!userProjects || userProjects.projects.length === 0) {
          return res.status(404).json({ message: 'No projects found for this user' });
      }

      // Step 2: Find the team members for each project in the list of project IDs
      const projectTeams = await Project.find({ _id: { $in: userProjects.projects } })
          .select('projectName teamMembers') // Select only necessary fields
          .lean();

      res.json(projectTeams);
  } catch (error) {
      console.error("Error fetching user project teams:", error);
      res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
