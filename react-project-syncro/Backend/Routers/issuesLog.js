const express = require('express');
const router = express.Router();
const Issue = require('../Modules/IssueSchema');

// POST: Create a new issue
router.post('/issues', async (req, res) => {
  const { projectId, description, severity, status, actualOutComes, stepsToReproduce, assignedTo, expectedResolutionDate, comments } = req.body;

  try {
    const count = await Issue.countDocuments(); // Fetch the current count for unique ID
    const issueId = `IS-${String(count + 1).padStart(3, '0')}`; // Custom ID format

    const issue = new Issue({
      issueId,
      projectId,
      description,
      severity,
      status,
      actualOutComes,
      stepsToReproduce,
      assignedTo,
      expectedResolutionDate,
      comments,
    });

    const savedIssue = await issue.save();
    res.status(201).json(savedIssue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET: Retrieve all issues for a specific project
router.get('/issues/:projectId', async (req, res) => {
  try {
    const issues = await Issue.find({ projectId: req.params.projectId });
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT: Update an existing issue
router.put('/issues/:id', async (req, res) => {
  try {
    const updatedIssue = await Issue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedIssue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE: Delete an issue
// DELETE: Delete an issue
router.delete('/issues/:id', async (req, res) => {
  try {
    await Issue.findByIdAndDelete(req.params.id);
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
