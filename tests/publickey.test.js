/*
 * Copyright (c) 2021 Riccardo Maldini.
 *
 * This file is part of the CovidAnalysis project, and is distributed under the terms of
 * the MIT License, as described in the file LICENSE in the repository's top directory.
 *
 */

const request = require('supertest')
const app = require('../app')

describe('Public key Endpoint', () => {
  it('Should respond 200', async () => {
    const res = await request(app).get('/publickey');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ publicKey: process.env.PUBLIC_KEY === undefined ? 'Hey I\'m a key!' : process.env.PUBLIC_KEY });
  });
});

