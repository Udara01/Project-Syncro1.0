const request = require('supertest');
const app = require('../app'); // Your Express app
const { User } = require('../models/User'); // Your User model

jest.mock('../models/User'); // Mock the User model

describe('POST /register', () => {
  it('should register a new user', async () => {
    User.create.mockResolvedValue({
      _id: 'someUserId',
      email: 'test@example.com',
      password: 'hashedPassword',
    });

    const response = await request(app)
      .post('/register')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  it('should return 400 if email is already registered', async () => {
    User.findOne.mockResolvedValue({
      _id: 'someUserId',
      email: 'test@example.com',
      password: 'hashedPassword',
    });

    const response = await request(app)
      .post('/register')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
