const mongoose = require('mongoose');

let retryCount = 0;

module.exports.connect = async () => {
  await tryConnect();
}

const tryConnect = async () => {
  try {
    const uri = encodeURI(process.env.MONGO_URL);
    console.log(`Connecting to MongoDB at ${uri}...`)
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      connectTimeoutMS: 30,
    });
    console.log(`MongoDB successfully connected to ${encodeURI(process.env.MONGO_URL)}!`);

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
