  const express = require('express');
  const multer = require('multer');
  const path = require('path');
  const fs = require('fs');
  const File = require('../Modules/FileSchema');
  const Project = require('../Modules/projectSchema');
  const User = require('../Modules/UserSchema');
  const { createNotification } = require('../Utils/NotificationUtils'); // call Notification create Function

  const router = express.Router();

// Set up multer for file uploads
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join(__dirname, '../public/file');
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  const upload = multer({ storage });

// Upload file
  router.post('/', upload.single('file'), async (req, res) => {
    try {
      const { description, projectId } = req.body;
      const file = new File({
        name: req.file.originalname,
        description,
        filePath: req.file ? `/file/${req.file.filename}` : null,
        projectId,
      });

      await file.save();

// Retrieve the project - so can get project name
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }

// Define roles that should receive notifications
      const rolesToNotify = ['Project Manager', 'Product Owner', 'Business Analyst', 'Software Architect', 'Team Lead', 'Developers/Programmers', 'UX/UI Designers', 'Quality Assurance Testers'];

// Send notifications to team members with specified roles
      for (const member of project.teamMembers) {
        if (rolesToNotify.includes(member.role)) {
          // Find the user by email
          const user = await User.findOne({ email: member.email });
          if (user) {
            const message = `A new Prioritizing Project Requirements file has been uploaded\n to the project: ${project.projectName}\n by the Project Manager`;
            await createNotification(user._id, 'file', message);
          } else {
            console.error(`User with email ${member.email} not found`);
          }
        }
      }

      res.status(200).json({ message: 'File uploaded successfully', file });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ message: 'Error uploading file', error });
    }
  });

// Get files by project ID
  router.get('/:projectId', async (req, res) => {
    try {
      const { projectId } = req.params;
      const files = await File.find({ projectId });
      res.status(200).json(files);
    } catch (error) {
      console.error('Error fetching files:', error);
      res.status(500).json({ message: 'Error fetching files', error });
    }
  });

  module.exports = router;
