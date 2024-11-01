const mongoose = require('mongoose');

// Define the task schema
/*
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  dueDate: { type: Date, required: true },
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }], // references User model
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true }, // references Project model
  createdAt: { type: Date, default: Date.now },
});*/

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  dueDate: { type: Date, required: true },
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' }, // New status field
  comment: { type: String }, // New comment field
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('UserTask', taskSchema);
