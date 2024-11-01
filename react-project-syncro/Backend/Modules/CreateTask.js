const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema for Team Members
const TeamMemberSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ['Developer', 'Designer', 'Project Manager', 'QA', 'Other'],
    default: 'Developer'
  }
});

// Create a schema for Tasks
const TaskSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  assignedMembers: [{
    type: Schema.Types.ObjectId,
    ref: 'TeamMember'
  }],
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date
  }
});

// Create models from the schemas
const TeamMember = mongoose.model('TeamMember', TeamMemberSchema);
const Task = mongoose.model('Task', TaskSchema);

module.exports = { TeamMember, Task };