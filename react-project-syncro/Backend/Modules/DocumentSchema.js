const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Project', 
  },
  title: { type: String, required: true },
  description: String,
  category: String,
  filePath: { type: String, required: true },
  version: { type: Number, default: 1 },
  createdBy: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

module.exports = mongoose.model('Document', documentSchema);
