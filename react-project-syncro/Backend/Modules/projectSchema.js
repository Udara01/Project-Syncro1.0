const mongoose = require('mongoose');

// Define the team member schema
const teamMemberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Project Manager', 'Product Owner', 'Business Analyst', 'Software Architect', 'Team Lead', 'Developers/Programmers', 'UX/UI Designers', 'Quality Assurance Testers', 'Client'],
    required: true
  }
});

// Define the project schema
const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
    unique: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  projectImage: {
    type: String,
    required: false // Optional
  },
  numberOfMembers: {
    type: Number,
    required: true
  },
  teamMembers: [teamMemberSchema], // Embedding team member schema
  projectManager: {
    type: String, // Store email or user ID
    required: true
  }
});

// Export the model
module.exports = mongoose.model('Project', projectSchema);

