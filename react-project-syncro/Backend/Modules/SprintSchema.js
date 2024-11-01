// Modules/SprintSchema.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  task: { type: String, required: true },
  assignedTo: { type: String, required: true },
  completed: { type: Boolean, default: false }
});
/*
const SprintSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true }, // Reference to Project
  name: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  tasks: [TaskSchema]
});*/
const SprintSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  name: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task1' }]  // Reference Task1
});

module.exports = mongoose.model('Sprint', SprintSchema);
