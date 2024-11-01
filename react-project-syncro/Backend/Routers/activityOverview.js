/*const express = require('express');
const router = express.Router();
const UserTask = require('../Modules/UserTaskSchema'); // Task schema
const UserProjects = require('../Modules/UserProjects'); // Project schema
const TimeTracking = require('../Modules/TimeTrackingSchema'); // Time tracking schema
const Milestone = require('../Modules/MilestoneSchema'); // Milestone schema
const mongoose = require('mongoose');

// Endpoint to get user performance data
// Endpoint to get user performance data
router.get('/user-performance/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Count completed tasks for the user
    const tasksCompleted = await UserTask.countDocuments({ assignedTo: { $in: [userId] }, status: 'completed' });

    // Count projects the user has joined using UserProjects schema
    const userProjects = await UserProjects.findOne({ email: userId });
    const projectsJoined = userProjects ? userProjects.projects.length : 0;

    // Calculate total hours tracked for the user
    const timeEntries = await TimeTracking.find({ userId:(userId) });
    const hoursTracked = parseFloat(timeEntries.reduce((total, entry) => total + entry.timeSpent, 0).toFixed(2));

    // Count comments added by the user
    const commentsAdded = await UserTask.countDocuments({ assignedTo: { $in: [userId] }, comment: { $exists: true, $ne: '' } });

    // Count milestones achieved by the user
    const milestonesAchieved = await Milestone.countDocuments({
      assignedTeam: userId,
      status: 'Completed',
    });

    res.json({
      tasksCompleted,
      projectsJoined,
      hoursTracked,
      commentsAdded,
      milestonesAchieved,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
*/


const express = require('express');
const router = express.Router();
const UserTask = require('../Modules/UserTaskSchema');
const UserProjects = require('../Modules/UserProjects');
const TimeTracking = require('../Modules/TimeTrackingSchema');
const Milestone = require('../Modules/MilestoneSchema');
const User = require('../Modules/UserSchema'); // Import User schema

// Endpoint to get user performance data
router.get('/user-performance/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Get user email by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userEmail = user.email;

    // Count completed tasks for the user
    const tasksCompleted = await UserTask.countDocuments({ assignedTo: { $in: [userId] }, status: 'completed' });

    // Find user projects by email and count them
    const userProjects = await UserProjects.findOne({ email: userEmail });
    const projectsJoined = userProjects && Array.isArray(userProjects.projects) ? userProjects.projects.length : 0;

    // Calculate total hours tracked for the user
    const timeEntries = await TimeTracking.find({ userId });
    const hoursTracked = parseFloat(timeEntries.reduce((total, entry) => total + entry.timeSpent, 0).toFixed(2));

    // Count comments added by the user
    const commentsAdded = await UserTask.countDocuments({ assignedTo: { $in: [userId] }, comment: { $exists: true, $ne: '' } });

    // Count milestones achieved by the user
    const milestonesAchieved = await Milestone.countDocuments({
      assignedTeam: userId,
      status: 'Completed',
    });

    res.json({
      tasksCompleted,
      projectsJoined,
      hoursTracked,
      commentsAdded,
      milestonesAchieved,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
