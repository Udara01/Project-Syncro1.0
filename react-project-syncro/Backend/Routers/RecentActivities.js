const express = require('express');
const UserProjects = require('../Modules/UserProjects');
const Requirement = require('../Modules/RequirementSchema'); 
const PrioritizedRequirement = require('../Modules/PrioritizedRequirementSchema'); 
const router = express.Router();

/*
// API to get recent requirements for user's projects
// API to get recent requirements for user's projects
router.get('/recentactivities', async (req, res) => {
  try {
    const userEmail = req.query.email;
    console.log('User email:', userEmail); // Check if email is received correctly

    // Fetch user's projects
    const userProjects = await UserProjects.findOne({ email: userEmail }).populate('projects');
    console.log('User projects:', userProjects); // Check if userProjects is retrieved

    if (!userProjects) {
      return res.status(404).json({ message: 'No projects found for this user.' });
    }

    // Find recent requirements related to user's projects
    const recentRequirements = await Requirement.find({
      projectId: { $in: userProjects.projects }
    })
      .sort({ updatedAt: -1 })
      .limit(5);

    console.log('Recent requirements:', recentRequirements); // Check if recentRequirements is retrieved

    res.json(recentRequirements);
  } catch (error) {
    console.error('Error in /recent-activities:', error); // Log the error in detail
    res.status(500).json({ error: error.message });
  }
});
*/

// Endpoint to retrieve recent activities (requirements) for the user's projects
router.get('/recentactivities', async (req, res) => {
  try {
    const userEmail = req.query.email; // Get user's email from the request query
    console.log('User email:', userEmail); // Check if the email is correctly passed

    // Step 1: Retrieve the user's projects
    const userProjects = await UserProjects.findOne({ email: userEmail }).populate('projects');
    console.log('User projects:', userProjects); // Check if the user's projects are retrieved

    // Check if the user has projects
    if (!userProjects) {
      return res.status(404).json({ message: 'No projects found for this user.' });
    }

    // Step 2: Find recent requirements related to these projects
    const recentRequirements = await Requirement.find({
      projectId: { $in: userProjects.projects.map((project) => project._id) } // Only get requirements for the user's project IDs
    })
    .sort({ updatedAt: -1 }) // Sort by latest updated
    .limit(5); // Limit the results to the 5 most recent activities

    console.log('Recent requirements:', recentRequirements); // Log recent requirements for debugging

    res.json(recentRequirements); // Send recent requirements as JSON
  } catch (error) {
    console.error('Error in /recentactivities:', error); // Log error if there's an issue
    res.status(500).json({ error: error.message });
  }
});




// Endpoint to download a file by file path
router.get('/download', (req, res) => {
  const filePath = req.query.path; // Get file path from query

  // Check if the file path is provided
  if (!filePath) {
    return res.status(400).json({ message: 'File path is required' });
  }

  // Use res.download to send the file to the client
  res.download(filePath, (err) => {
    if (err) {
      console.error('File download error:', err);
      res.status(500).json({ message: 'Error downloading file' });
    }
  });
});



// Endpoint to retrieve prioritized requirements for a user's projects
router.get('/prioritizedrequirements', async (req, res) => {
  try {
    const userEmail = req.query.email;

    // Fetch user's projects
    const userProjects = await UserProjects.findOne({ email: userEmail }).populate('projects');

    if (!userProjects) {
      return res.status(404).json({ message: 'No projects found for this user.' });
    }

    // Find prioritized requirements related to user's projects
    const prioritizedRequirements = await PrioritizedRequirement.find({
      projectId: { $in: userProjects.projects.map((project) => project._id) }
    })
      .sort({ updatedAt: -1 })
      .limit(5);

    res.json(prioritizedRequirements);
  } catch (error) {
    console.error('Error in /prioritizedrequirements:', error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to download a file by file path (remains the same)
router.get('/download', (req, res) => {
  const filePath = req.query.path;

  if (!filePath) {
    return res.status(400).json({ message: 'File path is required' });
  }

  res.download(filePath, (err) => {
    if (err) {
      console.error('File download error:', err);
      res.status(500).json({ message: 'Error downloading file' });
    }
  });
});

module.exports = router;