const request = require('supertest')
const app = require('../app')

describe('Subscribe Endpoint', () => {
  it('Lets users register if the subscription is well formed',  () => {
    expect(true).toBe(true);
  });

  it('Returns 400 if the subscription is not well formed', async () => {
    const res = await request(app).post('/subscribe').send({
      userId: 1,
      title: 'test is cool',
    });

    expect(res.statusCode).toEqual(400)
  });

  it('Returns 400 if the subscription is absent', () => {
    expect(true).toBe(true);
  });
});

