const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod;

if (process.env.ENV !== 'production') {
  mongod = new MongoMemoryServer();
}

module.exports.connect = async () => {

  let uri;
  let mongooseOpts;

  if (process.env.ENV === 'production') {
    uri = process.env.MONGO_URL;
    mongooseOpts = {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      connectTimeoutMS: 30,
    };
  } else {
    uri = await mongod.getUri();
    mongooseOpts = {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      connectTimeoutMS: 30,
    };
  }

  await mongoose.connect(uri, mongooseOpts);
  console.log(`MongoDB successfully connected to ${uri}!`);
}


/**
 * Drop database, close the connection and stop mongod.
 */
module.exports.closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();

  if (process.env.ENV !== 'production') {
    await mongod.stop();
  }
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
