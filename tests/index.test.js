const request = require('supertest')
const app = require('../app')

describe('Index Endpoint', () => {
  it('Should respond 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
  });
});

