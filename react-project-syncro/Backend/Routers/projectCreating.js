const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Project = require('../Modules/projectSchema');
const router = express.Router();

// Set up multer for storing uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = '../public/uploads'; 
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append extension
  }
});

const upload = multer({ storage: storage });

// Route to create a project
router.post('/', upload.single('projectImage'), async (req, res) => {
  try {
    const {
      projectName,
      startDate,
      endDate,
      numberOfMembers,
      teamMembers,
      creatorEmail // The email of the user creating the project
    } = req.body;

    // Add the creator as the project manager
    const projectManager = creatorEmail;
    const manager = {
      email: creatorEmail,
      role: 'Project Manager'
    };

    // Add the project manager to the team members
    const allTeamMembers = [manager, ...JSON.parse(teamMembers)];

    // Handle the project image
    const projectImage = req.file ? `/uploads/${req.file.filename}` : '/uploads/default.png';

    // Create a new project
    const newProject = new Project({
      projectName,
      startDate,
      endDate,
      projectImage,
      numberOfMembers,
      teamMembers: allTeamMembers,
      projectManager
    });

    // Save the project to the database
    const savedProject = await newProject.save();

    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error });
  }
});


// Route to get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error });
  }
});


module.exports = router;
