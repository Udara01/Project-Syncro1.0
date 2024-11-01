const mongoose = require('mongoose');

const testCaseSchema = new mongoose.Schema({
  testCaseId: { type: String, unique: true }, // Custom ID field
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  name: { type: String, required: true },
  feature: String,
  description: String,
  preConditions: String,
  testSteps: String,
  testData: String,
  expectedOutcome: String,
  postCondition: String,
  actualResult: String,
  status: {
    type: String,
    enum: ['Pass', 'Fail', 'In Progress', 'Pending'],
    default: 'Pending'
  },
  comments: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dateOfCreation: { type: Date, default: Date.now },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dateOfReview: Date,
});

module.exports = mongoose.model('TestCase', testCaseSchema);
