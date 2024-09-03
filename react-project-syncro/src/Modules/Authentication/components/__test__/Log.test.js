/*const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');


jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('POST /login', () => {
  it('should log in the user with correct credentials', async () => {
    User.findOne.mockResolvedValue({
      _id: 'someUserId',
      email: 'test@example.com',
      password: 'hashedPassword',
    });

    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('fakeToken');

    const response = await request(app)
      .post('/login')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token', 'fakeToken');
  });

  it('should return 400 for invalid credentials', async () => {
    User.findOne.mockResolvedValue({
      _id: 'someUserId',
      email: 'test@example.com',
      password: 'hashedPassword',
    });

    bcrypt.compare.mockResolvedValue(false);

    const response = await request(app)
      .post('/login')
      .send({
        email: 'test@example.com',
        password: 'wrongPassword',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
*/