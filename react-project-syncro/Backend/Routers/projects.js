// server/routes/projects.js

const express = require('express');
const router = express.Router();
const Project = require('../Modules/projectSchema');

// Get project details by ID
router.get('/:id', async (req, res) => {  // Update this line
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
