/*
 * Copyright (c) 2021 Riccardo Maldini.
 *
 * This file is part of the CovidAnalysis project, and is distributed under the terms of
 * the MIT License, as described in the file LICENSE in the repository's top directory.
 *
 */

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Subscription = require('../../models/subscription');
const mongod = new MongoMemoryServer();

module.exports.connect = async () => {
  const uri = await mongod.getUri();

  await mongoose.connect(uri,  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });
  console.log(`MongoDB successfully connected!`);
}

/**
 * Drop database, close the connection and stop mongod.
 */
module.exports.closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
}

/**
 * Remove all the data for all db collections.
 */
module.exports.clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
}

module.exports.insertMockSubscription = async () => {
  const subscriber = new Subscription(module.exports.mockSubscription);

  try {
    await subscriber.save();

  } catch (e) {
    console.log('error during initialization of test!');
  }
}

/**
 * An example valid subscription object.
 */
module.exports.mockSubscription = {
  endpoint: "https://fcm.googleapis.com/fcm/send/dHKZO0muOqQ:AP…WntN3Vxq1dZxxo68CMReZdXHL-0xQTyYjANJsoWNNrtxfyk_-",
  expirationTime: null,
}

/**
 * Returns the number of Subscriptions contained into the in-memory db.
 */
module.exports.countSubscriptions = async () => {
  return Subscription.countDocuments()
}
