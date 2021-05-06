const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();
const Subscription = require('../../models/subscription');

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

/**
 * An example valid subscription object.
 */
module.exports.mockSubscription = {
  "endpoint": "https://fcm.googleapis.com/fcm/send/eBCNqyXhGhk:APA91bHMOiiwQjXbBf7ffziwrgci4-gOGbAWqOsCoN0mQHIqPkPPiqLHw99HOdda0-oKrWju3fi4PIstOQ6UJVjwO-oB47cjyGrU3z48e6tdyB2Gm0bULEltFoI6h6tMZ2io5WBnQFg-",
  "expirationTime": null,
  "keys": {
    "p256dh": "BDx0xKFyA-PF1–2E7cupnrMpQij9zE-HXEuTQtJ0ghhtis2H2hAyezWdtLCTfib8V4UXls3yu2dpK0drL-ycU00",
    "auth": "L0lMJwwSW0fc1IkAMSK2wA"
  }
}

/**
 * Returns the number of Subscriptions contained into the in-memory db.
 */
module.exports.countSubscriptions = async () => {
  return Subscription.countDocuments()
}
