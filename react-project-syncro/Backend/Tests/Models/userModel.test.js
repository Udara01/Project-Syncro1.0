const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('');

let mongoServer;
let user;

beforeAll(async () => {
  // Start MongoMemoryServer and connect mongoose to it
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

beforeEach(async () => {
  // Create a fresh user before each test
  user = new User({
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    email: 'johndoe@example.com',
    password: 'plainPassword123',
  });
  await user.save();
});

afterEach(async () => {
  // Clear any existing data to ensure a fresh state for the next test
  await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
  // Disconnect and stop the in-memory server
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('User Model', () => {
  it('should hash the password before saving', async () => {
    // Password should be hashed, so it shouldn't equal the plain text password
    expect(user.password).not.toBe('plainPassword123');
  }, 10000);

  it('should match hashed passwords correctly', async () => {
    // Find the user by username and check if the password matches
    const foundUser = await User.findOne({ username: 'johndoe' });
    const isMatch = await foundUser.matchPassword('plainPassword123');
    expect(isMatch).toBe(true);
  }, 10000);
});
