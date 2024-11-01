const mongoose = require("mongoose");

const PrioritizedRequirementSchema = new mongoose.Schema({
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

module.exports = mongoose.model("PrioritizedRequirements", PrioritizedRequirementSchema);