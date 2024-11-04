// Backend/Tests/Models/taskModel.test.js
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const UserTask = require('../../Modules/taskSchema');
const User = require('../../Modules/userSchema'); 
const Project = require('../../Modules/projectSchema');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  await UserTask.deleteMany({});
  await User.deleteMany({});
  await Project.deleteMany({});
});

describe('Task Model', () => {
  it('should save a task with valid fields', async () => {
    const user = await new User({ username: 'johndoe', email: 'john@example.com', password: 'testpass123' }).save();
    const project = await new Project({ projectName: 'Sample Project', startDate: new Date(), endDate: new Date(), numberOfMembers: 1, projectManager: 'john@example.com' }).save();

    const taskData = {
      title: 'Sample Task',
      description: 'This is a sample task description.',
      priority: 'high',
      dueDate: new Date(),
      assignedTo: [user._id],
      project: project._id,
      status: 'in-progress',
      comment: 'This is a sample comment.'
      // Removing projectId or setting it to an ObjectId if needed
    };

    const task = new UserTask(taskData);
    const savedTask = await task.save();

    expect(savedTask._id).toBeDefined();
    expect(savedTask.priority).toBe('high');
    expect(savedTask.status).toBe('in-progress');
    expect(savedTask.assignedTo).toContainEqual(user._id);
    expect(savedTask.project).toEqual(project._id);
  });

  it('should enforce required fields', async () => {
    const task = new UserTask({});

    let error;
    try {
      await task.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.title).toBeDefined();
    expect(error.errors.description).toBeDefined();
    expect(error.errors.dueDate).toBeDefined();
    expect(error.errors.assignedTo).toBeDefined();
    expect(error.errors.project).toBeDefined();
  });

  it('should only accept valid enum values for priority and status', async () => {
    const taskData = {
      title: 'Invalid Priority Task',
      description: 'Task with invalid priority and status',
      priority: 'urgent', // Invalid priority
      status: 'on-hold',  // Invalid status
      dueDate: new Date(),
      assignedTo: [], // Assuming an empty array for simplicity
      project: new mongoose.Types.ObjectId() // Assuming a dummy ObjectId
    };

    let error;
    try {
      await new UserTask(taskData).save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.priority).toBeDefined();
    expect(error.errors.status).toBeDefined();
  });
});
