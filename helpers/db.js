/*
 * Copyright (c) 2021 Riccardo Maldini.
 *
 * This file is part of the CovidAnalysis project, and is distributed under the terms of
 * the MIT License, as described in the file LICENSE in the repository's top directory.
 *
 */

const mongoose = require('mongoose');

let retryCount = 0;

module.exports.connect = async () => {
  await tryConnect();
}

const tryConnect = async () => {
  try {
    const uri = encodeURI(process.env.MONGO_URL);
    console.log(`Connecting to MongoDB...`)
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log(`MongoDB successfully connected!`);

  } catch(e) {
    console.error('Error connecting to mongoDB! ', e);
    retryCount++;

    if (retryCount < 4) {
      console.log(`Retrying for the ${ retryCount }° time...`);
      await tryConnect();
    } else {
      console.error('Cannot connect to the database... Addios!');
      process.exit(1)
    }
  }
}
