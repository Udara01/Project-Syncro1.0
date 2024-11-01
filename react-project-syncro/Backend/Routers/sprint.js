// Routers/sprint.js
const express = require('express');
const Sprint = require('../Modules/SprintSchema');
const router = express.Router();

// Add a new sprint
router.post('/:projectId/sprints', async (req, res) => {
  try {
    const { projectId } = req.params;
    const { name, start, end } = req.body;
    const newSprint = new Sprint({ projectId, name, start, end, tasks: [] });
    await newSprint.save();
    res.status(201).json(newSprint);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// Get all sprints for a project
router.get('/:projectId/sprints', async (req, res) => {
  try {
    const { projectId } = req.params;
    const sprints = await Sprint.find({ projectId });
    res.json(sprints);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// Add a task to a sprint
router.post('/:projectId/sprints/:sprintId/tasks', async (req, res) => {
  try {
    const { sprintId } = req.params;
    const { task, assignedTo } = req.body;

    const sprint = await Sprint.findById(sprintId);
    if (!sprint) {
      return res.status(404).json({ message: 'Sprint not found' });
    }

    sprint.tasks.push({ task, assignedTo });
    await sprint.save();
    res.status(201).json(sprint);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// Get a specific sprint by ID
router.get('/:projectId/sprints/:sprintId', async (req, res) => {
  try {
    const { sprintId } = req.params;
    const sprint = await Sprint.findById(sprintId);
    if (!sprint) {
      return res.status(404).json({ message: 'Sprint not found' });
    }
    res.json(sprint);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

module.exports = router;
