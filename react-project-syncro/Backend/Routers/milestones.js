const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Milestone = require('../Modules/MilestoneSchema');
//const Task = require('../Modules/TaskSchema');
const User = require('../Modules/UserSchema');

/*

router.post('/projects/:projectId/milestones/create', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  const { title, description, startDate, endDate, assignedTeam } = req.body;
  const { projectId } = req.params;

  try {
    // Find users by email
    const users = await User.find({ email: { $in: assignedTeam } });
    
    if (users.length !== assignedTeam.length) {
      return res.status(404).json({ message: 'Some assigned users were not found' });
    }
    
    // Calculate duration in days
    const duration = Math.round((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));

    const milestoneData = {
      title,
      description,
      startDate,
      endDate,
      duration,
      assignedTeam: users.map(user => user._id), // Store user IDs
      assignedTeamEmail: assignedTeam,
      projectId,
    };

    // Create Milestone
    const newMilestone = await Milestone.create([milestoneData], { session });

    // Prepare and create Task data based on milestone fields
    const taskData = {
      text: title,
      start_date: startDate,
      duration,
      projectId,
    };

    const newTask = await Task.create([taskData], { session });

    // Commit transaction
    await session.commitTransaction();
    res.status(201).json({ message: 'Milestone and Task created successfully', newMilestone, newTask });

  } catch (error) {
    // Abort transaction in case of an error
    await session.abortTransaction();
    console.error('Error during milestone and task creation:', error);
    res.status(500).json({ message: 'Failed to save milestone or create task', error: error.message });
  } finally {
    // End session
    session.endSession();
  }
});
*/


router.post('/projects/:projectId/milestones/create', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  const { title, description, startDate, endDate, assignedTeam } = req.body;
  const { projectId } = req.params;
  console.log("Project ID:", projectId); // Add this to see if projectId is defined

  try {
    // Find users by email
    const users = await User.find({ email: { $in: assignedTeam } });
    
    if (users.length !== assignedTeam.length) {
      return res.status(404).json({ message: 'Some assigned users were not found' });
    }
    
    // Calculate duration in days
    const duration = Math.round((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));

    const milestoneData = {
      title,
      description,
      startDate,
      endDate,
      duration,
      assignedTeam: users.map(user => user._id), // Store user IDs
      assignedTeamEmail: assignedTeam,
      projectId,
    };

    // Create Milestone
    const newMilestone = await Milestone.create([milestoneData], { session });

    // Commit transaction
    await session.commitTransaction();
    res.status(201).json({ message: 'Milestone and Task created successfully', newMilestone});

  } catch (error) {
    // Abort transaction in case of an error
    await session.abortTransaction();
    console.error('Error during milestone and task creation:', error);
    res.status(500).json({ message: 'Failed to save milestone or create task', error: error.message });
  } finally {
    // End session
    session.endSession();
  }
});





// Fetch all milestones for a specific project
router.get('/projects/:projectId/milestones', async (req, res) => {
  const { projectId } = req.params;

  try {
    const milestones = await Milestone.find({ projectId })
      .populate({
        path: 'assignedTeam',    // Populate assignedTeam to get user details
        select: 'email',         // Only retrieve the email field
      });

    // Transform data to replace user objects with just emails
    const formattedMilestones = milestones.map(milestone => ({
      ...milestone.toObject(),   // Convert the Mongoose document to a plain object
      assignedTeam: milestone.assignedTeam.map(user => user.email),  // Replace with emails
    }));

    res.status(200).json(formattedMilestones);
  } catch (error) {
    console.error('Error fetching milestones:', error);
    res.status(500).json({ message: 'Failed to retrieve milestones' });
  }
});













/*

// Fetch all milestones for a specific project
router.get('/projects/:projectId/milestones', async (req, res) => {
  const { projectId } = req.params;

  try {
    const milestones = await Milestone.find({ projectId });
    res.status(200).json(milestones);
  } catch (error) {
    console.error('Error fetching milestones:', error);
    res.status(500).json({ message: 'Failed to retrieve milestones' });
  }
});
*/

// routes/milestoneRoutes.js
router.patch('/projects/:projectId/milestones/:id', async (req, res) => {
  const { id } = req.params;
  const { status, progress } = req.body;

  try {
    const updatedMilestone = await Milestone.findByIdAndUpdate(id, { status, progress }, { new: true });
    res.status(200).json(updatedMilestone);
  } catch (error) {
    console.error('Error updating milestone:', error);
    res.status(500).json({ message: 'Failed to update milestone' });
  }
});

// Delete milestone by ID
router.delete('/projects/:projectId/milestones/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Milestone.findByIdAndDelete(id);
    res.status(200).json({ message: 'Milestone deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting milestone', error });
  }
});


module.exports = router;
