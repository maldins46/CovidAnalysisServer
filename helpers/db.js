const mongoose = require('mongoose');

module.exports.connect = async () => {
  const uri = process.env.MONGO_URL;
  const mongooseOpts = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    connectTimeoutMS: 30,
  };

  await mongoose.connect(uri, mongooseOpts);
  console.log(`MongoDB successfully connected to ${uri}!`);
}
