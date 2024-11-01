// Import correct schema and fix typos in route handlers
const express = require("express");
const multer = require("multer");
const path = require("path");
const Requirement = require("../Modules/PrioritizedRequirementSchema"); // Ensure consistent use of "Requirement"

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "../uploads")),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

// POST Prioritized requirements Document to upload files and create a requirement
router.post("/projects/:projectId/Prioritized/upload", upload.array("files", 5), async (req, res) => {
  const { description, projectId, priority = "Normal", createdBy } = req.body;
  const filePaths = req.files.map(file => file.path);
  const fileNames = req.files.map(file => file.originalname);

  const newRequirement = new Requirement({  // Fix the typo here
    description,
    projectId,
    filePath: filePaths,
    fileName: fileNames,
    createdBy: createdBy || "anonymous",
    status: "New",
    priority,
  });

  try {
    const savedRequirement = await newRequirement.save();
    res.status(201).json(savedRequirement);
  } catch (error) {
    console.error("Error saving requirement:", error);
    res.status(500).json({ error: "Failed to save requirement" });
  }
});

// Route to get all Prioritized requirements Document for a project
router.get("/projects/:projectId/Prioritized", async (req, res) => {
  const { projectId } = req.params;

  try {
    const requirements = await Requirement.find({ projectId });
    res.status(200).json(requirements);
  } catch (error) {
    console.error("Error fetching Prioritized requirement Documents:", error);
    res.status(500).json({ error: "Failed to fetch requirements" });
  }
});

// Route to add a comment to a Prioritized requirement Document
router.post("/projects/:projectId/Prioritized/:PrioritizedID/comments", async (req, res) => {
  const { PrioritizedID } = req.params;
  const { userEmail, commentText } = req.body;

  try {
    const priority = await Requirement.findById(PrioritizedID);  // Use Requirement model correctly
    if (!priority) {
      return res.status(404).json({ error: "Requirement not found" });
    }

    priority.comments.push({ userEmail, commentText, createdAt: new Date() });
    await priority.save();
    res.status(200).json(priority);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Failed to add comment" });
  }
});


// Route to download a Prioritized file by filename
router.get('/projects/:projectId/Prioritized/download/:filename', async (req, res) => {
  const { projectId, filename } = req.params;

  try {
    // Retrieve the requirement by projectId and check if it includes the filename
    const requirement = await Requirement.findOne({
      projectId,
      fileName: filename,
    });

    // Check if the requirement exists and if the file is in the requirement's file paths
    if (!requirement || !requirement.fileName.includes(filename)) {
      return res.status(404).send('File not found');
    }

    // Find the exact path in filePath array that corresponds to the filename
    const fileIndex = requirement.fileName.indexOf(filename);
    const filePath = path.resolve(requirement.filePath[fileIndex]);

    // Set headers to prompt download
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/octet-stream');

    // Stream the file to the response
    res.download(filePath, filename, (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).send('Error downloading file');
      }
    });
  } catch (error) {
    console.error('Error fetching file:', error);
    res.status(500).send('Server error');
  }
});


module.exports = router;
