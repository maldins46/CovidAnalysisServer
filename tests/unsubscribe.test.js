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

beforeAll(async () => await mockDb.connect());
beforeEach(async () => await mockDb.insertMockSubscription());
afterEach(async () => await mockDb.clearDatabase());
afterAll(async () => await mockDb.closeDatabase());

describe('Unsubscribe Endpoint', () => {
  it('Lets users unregister if body contains an endpoint',  async () => {
    const res = await request(app).delete('/unsubscribe').send({ endpoint: mockDb.mockSubscription.endpoint });
    expect(await mockDb.countSubscriptions()).toEqual(0);
    expect(res.statusCode).toEqual(200);
  });

  it('Returns 400 if the subscription is not well formed', async () => {
    const res = await request(app).delete('/unsubscribe').send({ notWellFormed: 'endpointMissing!'});
    expect(await mockDb.countSubscriptions()).toBeGreaterThan(0);
    expect(res.statusCode).toEqual(400);
  });
});

