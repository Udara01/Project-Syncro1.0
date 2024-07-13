const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const File = require('../Modules/FileSchema');

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
