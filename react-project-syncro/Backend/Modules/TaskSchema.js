const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  start_date: { type: Date, required: true },
  duration: { type: Number, required: true },
  progress: { type: Number, default: 0 },
  parent: { type: Number, default: 0 },  // Allow tasks to be sub-tasks
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true }
});

module.exports = mongoose.model('Task1', TaskSchema);


/*const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  start_date: { type: Date, required: true },
  duration: { type: Number, required: true },
  progress: { type: Number, default: 0 },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', default: null },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  sprintId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sprint', required: true }
});

const Task = mongoose.model('Task1', TaskSchema);

module.exports = Task;*/



