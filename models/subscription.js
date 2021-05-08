/*
 * Copyright (c) 2021 Riccardo Maldini.
 *
 * This file is part of the CovidAnalysis project, and is distributed under the terms of
 * the MIT License, as described in the file LICENSE in the repository's top directory.
 *
 */

const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  endpoint: {
    type: String,
    required: true
  },
  expirationTime: String,
  keys: {
      p256dh: {
        type: String,
      },
      auth: {
        type: String,
      }
    }
});

module.exports = mongoose.model('Subscription', subscriptionSchema, 'subscriptions');
