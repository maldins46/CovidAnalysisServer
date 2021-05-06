const request = require('supertest')
const mockDb = require('./helpers/mockdb');
const app = require('../app')

beforeAll(async () => await mockDb.connect());

afterEach(async () => await mockDb.clearDatabase());

afterAll(async () => await mockDb.closeDatabase());

describe('Trigger Endpoint', () => {
  describe('Covid Trigger endpoint', () => {
    it('Should respond 200 if all messages are sent correctly', async () => {
      const res = await request(app).get('/trigger/covid');
      expect(res.statusCode).toEqual(200);
      expect(res.body.type).toEqual('covid')
    });
  })

  describe('Covid Vaccines endpoint', () => {
    it('Should respond 200 if all messages are sent correctly', async () => {
      const res = await request(app).get('/trigger/vaccines');
      expect(res.statusCode).toEqual(200);
      expect(res.body.type).toEqual('vaccines')
    });
  })

  describe('Generic endpoint', () => {
    it('Should respond 200 if all messages are sent correctly', async () => {
      const res = await request(app).get('/trigger/anythingelse');
      expect(res.statusCode).toEqual(200);
      expect(res.body.type).toEqual('generic')
    });
  })
});
