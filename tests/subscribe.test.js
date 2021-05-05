const request = require('supertest')
const dbHandler = require('./dbHandler');
const mockSub = require('../models/subscription').mockSub;
const Subscription = require('../models/subscription').model;
const app = require('../app')

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

describe('Subscribe Endpoint', () => {
  it('Lets users register if the subscription is well formed',  async () => {
    const res = await request(app).post('/subscribe').send(mockSub);
    expect(await Subscription.countDocuments()).toBeGreaterThan(0);
    expect(res.statusCode).toEqual(200);
  });

  it('Returns 400 if the subscription is not well formed', async () => {
    const res = await request(app).post('/subscribe').send({ notAProper: 'pushSubscription!'});
    expect(await Subscription.countDocuments()).toEqual(0);
    expect(res.statusCode).toEqual(400);
  });

  it('Returns 400 if the subscription is absent', async () => {
    const res = await request(app).post('/subscribe');
    expect(await Subscription.countDocuments()).toEqual(0);
    expect(res.statusCode).toEqual(400);
  });
});

