// Backend/Tests/Models/projectModel.test.js

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Project = require('../../Modules/projectSchema');

let mongoServer;

beforeAll(async () => {
  // Start MongoMemoryServer and connect mongoose to it
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  // Stop MongoMemoryServer and close mongoose connection
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Project.deleteMany({}); // Clear project data before each test
});

describe('Project Model', () => {
  it('should save a project with valid fields', async () => {
    const projectData = {
      projectName: 'Project Sync',
      startDate: new Date(),
      endDate: new Date(),
      numberOfMembers: 5,
      projectManager: 'manager@example.com',
      status: 'In Progress',
      teamMembers: [
        { email: 'member1@example.com', role: 'Developers/Programmers' },
        { email: 'member2@example.com', role: 'UX/UI Designers' },
      ],
    };

    const project = new Project(projectData);
    const savedProject = await project.save();

    expect(savedProject._id).toBeDefined();
    expect(savedProject.projectName).toBe(projectData.projectName);
    expect(savedProject.status).toBe('In Progress');
    expect(savedProject.teamMembers).toHaveLength(2);
  });

  // Add additional test cases as needed
});
