/*
 * Copyright (c) 2021 Riccardo Maldini.
 *
 * This file is part of the CovidAnalysis project, and is distributed under the terms of
 * the MIT License, as described in the file LICENSE in the repository's top directory.
 *
 */

const request = require('supertest')
const mockDb = require('./helpers/mockdb');
const app = require('../app')
const authHeader = { 'Authorization' : `Basic ${Buffer.from(`${process.env.TRIGGERS_USERNAME}:${process.env.TRIGGERS_PASSWORD}`).toString('base64')}`};

beforeAll(async () => await mockDb.connect());
afterEach(async () => await mockDb.clearDatabase());
afterAll(async () => await mockDb.closeDatabase());

describe('Trigger Endpoint', () => {
  it('Should respond 401 if auth is not set correctly', async () => {
    const res = await request(app).get('/trigger/anythingelse');
    expect(res.statusCode).toEqual(401);
  });

  describe('Covid Trigger endpoint', () => {
    it('Should respond 200 if all messages are sent correctly', async () => {
      const res = await request(app).get('/trigger/covid').set(authHeader);
      expect(res.statusCode).toEqual(200);
      expect(res.body.type).toEqual('covid')
    });
  })

  describe('Covid Vaccines endpoint', () => {
    it('Should respond 200 if all messages are sent correctly', async () => {
      const res = await request(app).get('/trigger/vaccines').set(authHeader);
      expect(res.statusCode).toEqual(200);
      expect(res.body.type).toEqual('vaccines')
    });
  })

  describe('Generic endpoint', () => {
    it('Should respond 200 if all messages are sent correctly', async () => {
      const res = await request(app).get('/trigger/anythingelse').set(authHeader);
      expect(res.statusCode).toEqual(200);
      expect(res.body.type).toEqual('generic')
    });
  })
});
