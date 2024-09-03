const express = require('express');
const router = express.Router();
const { Task, TeamMember } = require('../Modules/CreateTask');

// Create a new task
router.post('/', async (req, res) => {
  try {
    const { name, description, assignedMembers, dueDate } = req.body;

    const newTask = new Task({ 
      name,
      description,
      assignedMembers,
      dueDate
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedMembers');
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

module.exports = router;
