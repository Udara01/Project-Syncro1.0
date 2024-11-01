const express = require('express');
const multer = require('multer');
const path = require('path');
const Design = require('../Modules/DesignSchema'); // MongoDB model
const User = require('../Modules/UserSchema');
const router = express.Router();

// Setup file storage (Multer)
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/designs/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Upload design file
/*router.post('/projects/:projectId/designs/upload', upload.single('design'), async (req, res) => {
  try {
      const newDesign = new Design({
          fileName: req.file.filename,
          filePath: req.file.path, // Save the full file path
          projectId: req.params.projectId,  // Add projectId here
          uploadDate: new Date(),
      });
      await newDesign.save();
      res.status(201).send('File uploaded successfully');
  } catch (error) {
      res.status(500).send('Error uploading file');
  }
});*/

// Upload design file with user email
router.post('/projects/:projectId/designs/upload', upload.single('design'), async (req, res) => {
  try {
      const { userEmail } = req.body; // Capture email from request body
      const newDesign = new Design({
          fileName: req.file.filename,
          filePath: req.file.path,
          projectId: req.params.projectId,
          uploadDate: new Date(),
          uploaderEmail: userEmail, // Save uploader's email
      });
      await newDesign.save();
      res.status(201).send('File uploaded successfully');
  } catch (error) {
      res.status(500).send('Error uploading file');
  }
});



// Fetch designs with comments for specific project
router.get('/projects/:projectId/designs-with-comments', async (req, res) => {
  try {
      // Populate comments and user details
      const designs = await Design.find({ projectId: req.params.projectId });//.populate('comments.userId', 'name');
      res.json(designs);
  } catch (error) {
      res.status(500).send('Error fetching designs');
  }
});


// Submit a comment for a specific design
router.post('/projects/:projectId/designs/:designId/comment', async (req, res) => {
  try {
      const design = await Design.findById(req.params.designId);
      if (!design) {
          return res.status(404).send('Design not found');
      }

      const comment = {
          userEmail: req.body.userEmail, // Use email instead of userId
          commentText: req.body.commentText,
      };

      design.comments.push(comment);
      await design.save();

      res.status(201).send('Comment added successfully');
  } catch (error) {
      console.error('Error adding comment:', error);
      res.status(500).send('Error adding comment');
  }
});


// Download design file
// Download design file
router.get('/designs/download/:id', async (req, res) => {
    try {
        const design = await Design.findById(req.params.id);
        if (!design) {
            return res.status(404).send('Design not found');
        }
  
        const filePath = path.resolve(design.filePath); // Ensure the path is absolute
        const fileName = design.fileName;
  
        // Set headers to prompt download
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        res.setHeader('Content-Type', 'application/octet-stream');
  
        // Stream the file to the response
        res.download(filePath, fileName, (err) => {
            if (err) {
                console.error('Error downloading file:', err);
                res.status(500).send('Error downloading file');
            }
        });
    } catch (error) {
        console.error('Error fetching design file:', error);
        res.status(500).send('File not found');
    }
  });
  

module.exports = router;
