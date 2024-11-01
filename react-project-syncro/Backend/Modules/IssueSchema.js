const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  issueId: { type: String, unique: true }, // Custom ID field
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Project', // Assuming you have a Project model
  },
  description: {
    type: String,
    required: true,
  },
  severity: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    required: true,
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
    required: true,
  },
  actualOutComes: {
    type: String,
  },
  stepsToReproduce: {
    type: String,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
  },
  dateReported: {
    type: Date,
    default: Date.now,
  },
  expectedResolutionDate: {
    type: Date,
  },
  actualResolutionDate: {
    type: Date,
  },
  comments: {
    type: String,
  },
}, { timestamps: true });

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
