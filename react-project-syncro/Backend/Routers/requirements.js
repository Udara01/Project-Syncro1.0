const express = require("express");
const multer = require("multer");
const path = require("path");
const Requirement = require("../Modules/RequirementSchema");

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "../uploads")),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

// POST request to upload files and create a requirement
router.post("/projects/:projectId/requirements/upload", upload.array("files", 5), async (req, res) => {
  const { description, projectId, priority = "Normal", createdBy } = req.body;
  const filePaths = req.files.map(file => file.path);
  const fileNames = req.files.map(file => file.originalname);  // Save original names

  const newRequirement = new Requirement({
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

// Route to get all requirements for a project
router.get("/projects/:projectId/requirements", async (req, res) => {
  const { projectId } = req.params;
  
  try {
    const requirements = await Requirement.find({ projectId });
    res.status(200).json(requirements);
  } catch (error) {
    console.error("Error fetching requirements:", error);
    res.status(500).json({ error: "Failed to fetch requirements" });
  }
});

// Route to download a specific file by filename
// Route to download a specific file by filename
/*router.get("/projects/:projectId/requirements/download/:filename", (req, res) => {
  const filename = req.params.filename;
  //const filePath = path.join(__dirname, "../uploads", filename);
  const filePath = path.resolve(__dirname, "../uploads", filename);

  console.log("Attempting to download file from path:", filePath); // Debugging line to check the file path

  // Use fs.access to check if the file exists before attempting to download
  const fs = require("fs");
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error("File not found:", err);
      return res.status(404).json({ error: "File not found" });
    }

    res.download(filePath, (downloadErr) => {
      if (downloadErr) {
        console.error("File download error:", downloadErr);
        res.status(500).json({ error: "Failed to download file" });
      }
    });
  });
});*/


router.get('/projects/:projectId/requirements/download/:filename', async (req, res) => {
  try {
    // Retrieve the requirement by projectId and filename (this could vary if each filename is unique)
    const requirement = await Requirement.findOne({
      projectId: req.params.projectId,
      fileName: req.params.filename,
    });

    // Check if the requirement and file exist
    if (!requirement || !requirement.filePath || !requirement.fileName.includes(req.params.filename)) {
      return res.status(404).send('File not found');
    }

    // Find the exact path in filePath array that corresponds to the filename
    const fileIndex = requirement.fileName.indexOf(req.params.filename);
    const filePath = path.resolve(requirement.filePath[fileIndex]);

    // Set headers to prompt download
    res.setHeader('Content-Disposition', `attachment; filename="${req.params.filename}"`);
    res.setHeader('Content-Type', 'application/octet-stream');

    // Stream the file to the response
    res.download(filePath, req.params.filename, (err) => {
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

// Route to add a comment to a specific requirement
router.post("/projects/:projectId/requirements/:requirementId/comments", async (req, res) => {
  const { requirementId } = req.params;
  const { userEmail, commentText } = req.body;

  try {
    const requirement = await Requirement.findById(requirementId);
    if (!requirement) {
      return res.status(404).json({ error: "Requirement not found" });
    }

    requirement.comments.push({ userEmail, commentText, createdAt: new Date() });
    await requirement.save();
    res.status(200).json(requirement);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Failed to add comment" });
  }
});


module.exports = router;
