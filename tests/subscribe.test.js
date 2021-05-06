const request = require('supertest')
const mockDb = require('./helpers/mockdb');
const app = require('../app')

beforeAll(async () => await mockDb.connect());
afterEach(async () => await mockDb.clearDatabase());
afterAll(async () => await mockDb.closeDatabase());

describe('Subscribe Endpoint', () => {
  it('Lets users register if the subscription is well formed',  async () => {
    const res = await request(app).post('/subscribe').send(mockDb.mockSubscription);
    expect(await mockDb.countSubscriptions()).toBeGreaterThan(0);
    expect(res.statusCode).toEqual(200);
  });

  it('Returns 400 if the subscription is not well formed', async () => {
    const res = await request(app).post('/subscribe').send({ notAProper: 'pushSubscription!'});
    expect(await mockDb.countSubscriptions()).toEqual(0);
    expect(res.statusCode).toEqual(400);
  });

  it('Returns 400 if the subscription is absent', async () => {
    const res = await request(app).post('/subscribe');
    expect(await mockDb.countSubscriptions()).toEqual(0);
    expect(res.statusCode).toEqual(400);
  });
});

