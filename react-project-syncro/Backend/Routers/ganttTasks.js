const express = require('express');
const mongoose = require('mongoose');  // Ensure mongoose is required here
const router = express.Router();
const Task = require('../Modules/TaskSchema');

// Save new tasks to the database
router.post('/tasks', async (req, res) => {
  try {
    const task = req.body;
    console.log('Incoming task data:', task);  // Log the task data for debugging

    // Check for required fields and validate the start_date format
    if (!task.text || !task.start_date || !task.duration || isNaN(new Date(task.start_date))) {
      return res.status(400).json({ message: 'Invalid task data' });
    }

    const savedTask = await Task.create(task);
    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error saving task:', error.message, error.stack);  // Log the exact error
    res.status(500).json({ message: 'Failed to save task', error: error.message });
  }
});


// Update existing tasks
router.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Validate the task ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }

    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Failed to update task', error: error.message });
  }
});

router.get('/tasks', async (req, res) => {
  const { projectId } = req.query;

  // Validate projectId format
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ message: 'Invalid projectId' });
  }

  try {
    const tasks = await Task.find({ projectId });

    const formattedTasks = tasks.map(task => ({
      id: task._id,
      text: task.text,
      // Format start_date to MM/DD/YYYY
      start_date: new Date(task.start_date).toLocaleDateString("en-US", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }),
      duration: task.duration,
      progress: task.progress,
      parent: task.parent || 0
    }));

    // Calculate the overall progress
    const totalDuration = tasks.reduce((sum, task) => sum + task.duration, 0);
    const overallProgress = totalDuration > 0 ? 
      tasks.reduce((sum, task) => sum + (task.progress * task.duration), 0) / totalDuration 
      : 0;

    res.json({
      data: formattedTasks,
      overallProgress: Math.round(overallProgress * 100),  // Convert to percentage
      links: []  // You can add task dependencies (links) here if needed
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
  }
});



// Delete a task
router.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Validate task ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }

    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Failed to delete task', error: error.message });
  }
});

module.exports = router;

/*
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Task = require('../Modules/TaskSchema');

// Save new tasks to the database
router.post('/projects/:projectId/sprints/:sprintId/tasks', async (req, res) => {
  try {
    const task = req.body;
    console.log('Incoming task data:', task);  // Log the task data for debugging

    // Check for required fields and validate the start_date format
    if (!task.text || !task.start_date || !task.duration || isNaN(new Date(task.start_date))) {
      return res.status(400).json({ message: 'Invalid task data' });
    }

    const savedTask = await Task.create(task);
    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error saving task:', error.message, error.stack);  // Log the exact error
    res.status(500).json({ message: 'Failed to save task', error: error.message });
  }
});


// Update existing tasks
router.put('/projects/:projectId/sprints/:sprintId/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }

    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error.message, error.stack);
    res.status(500).json({ message: 'Failed to update task', error: error.message });
  }
});

// Get tasks for a specific sprint (Gantt)
router.get('/projects/:projectId/sprints/:sprintId/gantt', async (req, res) => {
  const { projectId, sprintId } = req.params;
  try {
    const tasks = await Task.find({ projectId, sprintId });
    const formattedTasks = tasks.map((task) => ({
      id: task._id,
      text: task.text,
      start_date: new Date(task.start_date).toISOString(), // Consider using .split('T')[0] if 'YYYY-MM-DD' format is needed
      duration: task.duration,
      progress: task.progress,
      parent: task.parent || 0,
    }));
    res.json({ data: formattedTasks });
  } catch (error) {
    console.error('Error fetching tasks:', error.message, error.stack);
    res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
  }
});




// Delete a task
router.delete('/projects/:projectId/sprints/:sprintId/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }

    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error.message, error.stack);
    res.status(500).json({ message: 'Failed to delete task', error: error.message });
  }
});


module.exports = router;*/
