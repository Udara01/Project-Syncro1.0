const express = require('express');
const Task = require('../Modules/UserTaskSchema');
const User = require('../Modules/UserSchema');
const router = express.Router();

// Route to assign a task
router.post('/project/:projectId/tasks', async (req, res) => {
  const { projectId } = req.params;
  const { title, description, priority, dueDate, assignedTo } = req.body;

  try {
    // Validate if all assigned users exist by their email
    const users = await User.find({ email: { $in: assignedTo } }); // Find users by email
    if (users.length !== assignedTo.length) {
      return res.status(404).json({ message: 'Some assigned users were not found' });
    }

    // Create new task with valid users and project ID
    const newTask = new Task({
      title,
      description,
      priority,
      dueDate,
      assignedTo: users.map(user => user._id), // Store real user IDs
      project: projectId
    });

    await newTask.save();
    res.status(201).json({ task: newTask });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create task' });
  }
});



router.get('/project/:projectId/tasks/user/:userEmail', async (req, res) => {
  const { projectId, userEmail } = req.params;

  try {
    // Find the user by their email
    const user = await User.findOne({ email: userEmail });
    
    // Debugging: Log the user object
    console.log('User found:', user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Debugging: Log project ID and user ID
    console.log('Project ID:', projectId, 'User ID:', user._id);

    // Find tasks assigned to the user in the given project
    const tasks = await Task.find({
      project: projectId,
      assignedTo: { $in: [user._id] },
    }).populate('assignedTo');

    // Debugging: Log fetched tasks
    console.log('Tasks fetched:', tasks);

    if (tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks assigned to the user' });
    }

    res.status(200).json({ tasks });
  } catch (err) {
    // Debugging: Log the actual error
    console.error('Error fetching tasks:', err);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});


// Route to update task status and add a comment
router.put('/project/:projectId/tasks/:taskId', async (req, res) => {
  const { projectId, taskId } = req.params;
  const { status, comment } = req.body;

  try {
    // Find the task by taskId and ensure it belongs to the correct project
    const task = await Task.findOne({ _id: taskId, project: projectId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update the task's status and add a comment if provided
    if (status) task.status = status;  // e.g., "completed", "pending"
    if (comment) task.comment = comment;

    await task.save();
    res.status(200).json({ message: 'Task updated successfully', task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update task' });
  }
});


// Route for team leader to view all tasks for a specific project
router.get('/project/:projectId/tasks', async (req, res) => {
  const { projectId } = req.params;

  try {
    // Find all tasks related to the project and populate assigned users' details
    const tasks = await Task.find({ project: projectId }).populate('assignedTo', 'email'); // Populate 'assignedTo' with users' emails

    if (!tasks) {
      return res.status(404).json({ message: 'No tasks found for this project' });
    }

    res.status(200).json({ tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
});




router.get('/project/:projectId/tasks/progress', async (req, res) => {
  const { projectId } = req.params;

  try {
    const totalTasks = await Task.countDocuments({ project: projectId });
    const completedTasks = await Task.countDocuments({ project: projectId, status: 'completed' });
    const inProgressTasks = await Task.countDocuments({ project: projectId, status: 'in-progress' });
    const pendingTasks = await Task.countDocuments({ project: projectId, status: 'pending' });

    res.status(200).json({
      totalTasks,
      completedTasks,
      inProgressTasks,
      pendingTasks
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch project progress' });
  }
});




const { getTasksByUser } = require('../Controller/taskController');

router.get('/tasks/user/:userId', getTasksByUser);










module.exports = router;
