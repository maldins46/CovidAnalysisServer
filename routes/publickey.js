/*
 * Copyright (c) 2021 Riccardo Maldini.
 *
 * This file is part of the CovidAnalysis project, and is distributed under the terms of
 * the MIT License, as described in the file LICENSE in the repository's top directory.
 *
 */

const express = require('express')
const router = express.Router();

/* POST subscribe to notifications. */
router.get('/', async (req, res, next) => {
  const publicKey = process.env.PUBLIC_KEY ??= 'Hey I\'m a key!';
  res.send({ publicKey: publicKey });
});

module.exports = router;
