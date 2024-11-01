const express = require('express');
const multer = require('multer');
const Document = require('../Modules/DocumentSchema');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage, 
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const allowedFormats = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    if (allowedFormats.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file format. Please upload a PDF, DOCX, or XLSX file.'));
    }
  },
});


router.post('/documents/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded or invalid file format' });
  }
  try {
    const { title, description, category, projectId, createdBy } = req.body;
    const document = new Document({
      title,
      description,
      category,
      filePath: req.file.path,
      projectId,
      createdBy: createdBy || "anonymous",

    });
    await document.save();
    res.json({ message: 'Document uploaded successfully', document });
  } catch (error) {
    console.error('Error uploading document:', error.message, error.stack);
    res.status(500).json({ error: 'Error uploading document' });
  }
});


router.get('/:projectId/documents/show', async (req, res) => {
  const { projectId } = req.params;
  try {
    const documents = await Document.find({ projectId });
    res.status(200).json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Error fetching documents' });
  }
});




router.delete('/documents/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Document.findByIdAndDelete(id);
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ error: 'Error deleting document' });
  }
});


// Download a document by ID
router.get('/documents/download/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const document = await Document.findById(id);
    if (!document) {
      return res.status(404).send('Document not found');
    }
    res.download(document.filePath, document.title, (err) => {
      if (err) {
        console.error('Error during file download:', err);
        res.status(err.status).end();
      }
    });
  } catch (error) {
    console.error('Error downloading document:', error);
    res.status(500).json({ error: 'Error downloading document' });
  }
});

// View a document's details by ID
router.get('/documents/view/:id', async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.json(document);
  } catch (error) {
    console.error('Error viewing document:', error);
    res.status(500).json({ error: 'Error viewing document' });
  }
});


// Update document
router.put('/documents/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category } = req.body; // Assuming you're updating these fields
    const updatedDocument = await Document.findByIdAndUpdate(id, { title, description, category }, { new: true });
    res.json({ message: 'Document updated successfully', document: updatedDocument });
  } catch (error) {
    console.error('Error updating document:', error);
    res.status(500).json({ error: 'Error updating document' });
  }
});



module.exports = router;
