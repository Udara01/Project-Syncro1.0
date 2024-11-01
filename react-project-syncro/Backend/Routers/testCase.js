const express = require('express');
const router = express.Router();
const TestCase = require('../Modules/TestCaseSchema');

// POST: Create a new test case
router.post('/testing', async (req, res) => {
  const { projectId, name, feature, description, preConditions, testSteps, testData, expectedOutcome, postCondition, actualResult, status, comments, createdBy, dateOfCreation, reviewedBy, dateOfReview } = req.body;

  try {
    const count = await TestCase.countDocuments(); // Fetch the current count for unique ID
    const testCaseId = `TC-${String(count + 1).padStart(3, '0')}`; // Custom ID format
    const newTestCase = new TestCase({
      testCaseId,
      projectId,
      name,
      feature,
      description,
      preConditions,
      testSteps,
      testData,
      expectedOutcome,
      postCondition,
      actualResult,
      status,
      comments,
      createdBy,
      dateOfCreation,
      reviewedBy,
      dateOfReview,
    });

    const savedTestCase = await newTestCase.save();
    res.status(201).json(savedTestCase);
  } catch (err) {
    res.status(500).json({ error: 'Error creating test case' });
  }
});

// GET: Fetch all test cases for a project
router.get('/testing/:projectId', async (req, res) => {
  try {
    const testCases = await TestCase.find({ projectId: req.params.projectId });
    res.status(200).json(testCases);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching test cases' });
  }
});

// PUT: Update a test case by ID
router.put('/testing/:id', async (req, res) => {
  try {
    const updatedTestCase = await TestCase.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTestCase) return res.status(404).json({ error: 'Test case not found' });

    res.status(200).json(updatedTestCase);
  } catch (err) {
    res.status(500).json({ error: 'Error updating test case' });
  }
});

// DELETE: Remove a test case by ID
router.delete('/testing/:id', async (req, res) => {
  try {
    const deletedTestCase = await TestCase.findByIdAndDelete(req.params.id);
    if (!deletedTestCase) return res.status(404).json({ error: 'Test case not found' });

    res.status(200).json({ message: 'Test case deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting test case' });
  }
});

module.exports = router;
