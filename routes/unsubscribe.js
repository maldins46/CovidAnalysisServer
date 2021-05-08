/*
 * Copyright (c) 2021 Riccardo Maldini.
 *
 * This file is part of the CovidAnalysis project, and is distributed under the terms of
 * the MIT License, as described in the file LICENSE in the repository's top directory.
 *
 */

const express = require('express')
const router = express.Router();
const Subscription = require('../models/subscription');

/* POST subscribe to notifications. */
router.delete('/', async (req, res, next) => {
  if (req.body.endpoint === undefined) {
    res.status(400).send({ message: 'Missing endpoint.' })
    return;
  }

  try {
    await Subscription.deleteMany({ endpoint: req.body.endpoint });
    res.send({ message: 'Subscription removed!' });

  } catch (e) {
    console.log('Cannot remove subscription!');
    res.status(400).send({ message: 'Cannot remove the subscription.' });
  }
});

module.exports = router;
