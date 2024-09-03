/*const jwt = require('jsonwebtoken');
jest.mock('jsonwebtoken');


describe('GET /protected', () => {
  it('should return 401 if no token is provided', async () => {
    const response = await request(app)
      .get('/protected');

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error');
  });

  it('should allow access with a valid token', async () => {
    jwt.verify.mockReturnValue({ _id: 'someUserId' });

    const response = await request(app)
      .get('/protected')
      .set('Authorization', 'Bearer fakeToken');

    expect(response.status).toBe(200);
  });
});
*/