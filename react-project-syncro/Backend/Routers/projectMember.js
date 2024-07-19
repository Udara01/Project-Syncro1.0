// Backend\Routers\projectMember.js
const express = require('express');
const router = express.Router();
const Project = require('../Modules/projectSchema');

// Route to get team members by project ID
router.get('/project/:projectId/team-members', async (req, res) => {
  const projectId = req.params.projectId;

  try {
    const project = await Project.findById(projectId).exec();
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ teamMembers: project.teamMembers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while retrieving the project' });
  }
});

module.exports = router;
