const request = require('supertest')
const dbHandler = require('../helpers/db');
const app = require('../app')
const mockSub = require('../models/subscription').mockSub;
const Subscription = require('../models/subscription').model;

beforeAll(async () => await dbHandler.connect());

//beforeEach(async () => await new Subscription(mockSub).save());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

describe('Trigger Endpoint', () => {
  describe('Covid Trigger endpoint', () => {
    it('Should respond 200 if all messages are sent correctly', async () => {
      const res = await request(app).get('/trigger/covid');
      expect(res.statusCode).toEqual(200);
    });
  })

  describe('Covid Vaccines endpoint', () => {
    it('Should respond 200 if all messages are sent correctly', async () => {
      const res = await request(app).get('/trigger/vaccines');
      expect(res.statusCode).toEqual(200);
    });
  })

  describe('Generic endpoint', () => {
    it('Should respond 200 if all messages are sent correctly', async () => {
      const res = await request(app).get('/trigger/anythingelse');
      expect(res.statusCode).toEqual(200);
    });
  })
});
