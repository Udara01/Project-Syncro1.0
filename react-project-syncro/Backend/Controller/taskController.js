const Task = require('../Modules/UserTaskSchema');
const Project = require('../Modules/projectSchema');
const User = require('../Modules/UserSchema');

// Controller to assign a task
exports.assignTask = async (req, res) => {
  const { title, description, priority, dueDate, assignedTo, project } = req.body;

  try {
    // Validate if the project exists
    const foundProject = await Project.findById(project);
    if (!foundProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Validate assigned users
    const users = await User.find({ _id: { $in: assignedTo } });
    if (users.length !== assignedTo.length) {
      return res.status(404).json({ message: 'Some assigned users were not found' });
    }

    // Create a new task
    const newTask = new Task({
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      project,
    });

    // Save task to the database
    await newTask.save();
    res.status(201).json({ message: 'Task assigned successfully', task: newTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to get tasks by project
exports.getTasksByProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    const tasks = await Task.find({ project: projectId }).populate('assignedTo', 'username email');
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getTasksByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const tasks = await Task.find({ assignedTo: userId }).populate('assignedTo', 'username').populate('project', 'name');
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};
