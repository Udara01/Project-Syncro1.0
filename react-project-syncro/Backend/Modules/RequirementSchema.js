// Backend/models/RequirementSchema.js
/*const mongoose = require("mongoose");

const requirementSchema = new mongoose.Schema({
  description: { type: String, required: true },
  filePath: [{ type: String }], // Array of file paths for multiple files
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  status: { type: String, default: "New" },
  priority: { type: String, default: "Normal" },
  createdBy: { type: String },
  comments: [
    {
      userEmail: { type: String, required: true },
      commentText: { type: String, required: true },
      date: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Requirement", requirementSchema);
*/

// RequirementSchema.js

const mongoose = require("mongoose");

const RequirementSchema = new mongoose.Schema({
  description: String,
  projectId: String,
  filePath: [String],     // Stores file paths for downloading
  fileName: [String],      // Stores file names for display
  createdBy: String,
  status: { type: String, default: "New" },
  priority: { type: String, default: "Normal" },
  comments: [{
    userEmail: String,
    commentText: String,
    createdAt: { type: Date, default: Date.now },
  }],
}, { timestamps: true });

module.exports = mongoose.model("Requirement", RequirementSchema);
