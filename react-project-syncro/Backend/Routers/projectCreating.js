//this is about creating project route and give the project details again

/*const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Project = require('../Modules/projectSchema');
const UserProjects = require('../Modules/UserProjects');

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

    // Update UserProjects for each team member
    for (const member of allTeamMembers) {
      await UserProjects.findOneAndUpdate(
        { email: member.email },
        { $addToSet: { projects: savedProject._id } },
        { upsert: true, new: true }
      );
    }

    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error });
  }
});

// Route to get projects by IDs
//In thsi route use to show all project user allocated

router.get('/', async (req, res) => {
  try {
    const { ids } = req.query;
    if (!ids) {
      return res.status(400).json({ message: 'No project IDs provided' });
    }

    const projectIds = ids.split(',').map(id => id.trim());
    const projects = await Project.find({ _id: { $in: projectIds } });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error });
  }
});

// Route to get a project by ID
//this route use for show corresponding project by project id. not all project. one project dashboard only
router.get('/:id', async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project', error });
  }
});

module.exports = router;*/

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Project = require('../Modules/projectSchema');
const UserProjects = require('../Modules/UserProjects');
const Notification = require('../Modules/NotificationSchema');
const User = require('../Modules/UserSchema');

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

// Function to create notifications
const createNotification = async (userId, type, message) => {
  try {
    const notification = new Notification({ userId, type, message });
    await notification.save();
  } catch (error) {
    console.error('Error creating notification:', error);
  }
};

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

    // Update UserProjects for each team member and create notifications
    for (const member of allTeamMembers) {
      // Find the user by email
      const user = await User.findOne({ email: member.email });
      if (user) {
        await UserProjects.findOneAndUpdate(
          { email: member.email },
          { $addToSet: { projects: savedProject._id } },
          { upsert: true, new: true }
        );

        // Create notification for each team member
        const message = `You have been added to a new project: ${projectName} as a ${member.role}`;
        await createNotification(user._id, 'project', message);
      } else {
        console.error(`User with email ${member.email} not found`);
      }
    }

    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error });
  }
});

// Route to get projects by IDs
router.get('/', async (req, res) => {
  try {
    const { ids } = req.query;
    if (!ids) {
      return res.status(400).json({ message: 'No project IDs provided' });
    }

    const projectIds = ids.split(',').map(id => id.trim());
    const projects = await Project.find({ _id: { $in: projectIds } });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error });
  }
});

// Route to get a project by ID
router.get('/:id', async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project', error });
  }
});


// Route to update an existing project
/*
router.put('/:id', upload.single('projectImage'), async (req, res) => {
  try {
    const { projectName, startDate, endDate, teamMembers, status } = req.body; // Get status from req.body

    const updateData = {
      projectName,
      startDate,
      endDate,
      teamMembers: JSON.parse(teamMembers),
      status // Include status in update data
    };

    if (req.file) {
      updateData.projectImage = `/uploads/${req.file.filename}`;
    }

    const updatedProject = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Error updating project' });
  }
});
*/


// Route to update an existing project
router.put('/:id', upload.single('projectImage'), async (req, res) => {
  try {
    const { projectName, startDate, endDate, teamMembers, status } = req.body;

    // Get the project manager details from the existing project
    const existingProject = await Project.findById(req.params.id);
    if (!existingProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const manager = {
      email: existingProject.projectManager,
      role: 'Project Manager'
    };

    // Combine the manager with new team members
    const allTeamMembers = [manager, ...JSON.parse(teamMembers)];
    
    // Handle the project image update if a new image is uploaded
    const updateData = {
      projectName,
      startDate,
      endDate,
      teamMembers: allTeamMembers,
      status
    };
    
    if (req.file) {
      updateData.projectImage = `/uploads/${req.file.filename}`;
    }

    const updatedProject = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true });

    // Update UserProjects for each team member and create notifications
    for (const member of allTeamMembers) {
      // Find the user by email
      const user = await User.findOne({ email: member.email });
      if (user) {
        await UserProjects.findOneAndUpdate(
          { email: member.email },
          { $addToSet: { projects: req.params.id } },
          { upsert: true, new: true }
        );

        // Create notification for each team member
        const message = `Project ${projectName} has been updated. You are assigned as ${member.role}`;
        await createNotification(user._id, 'project', message);
      } else {
        console.error(`User with email ${member.email} not found`);
      }
    }

    res.json(updatedProject);

  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Error updating project' });
  }
});

module.exports = router;

