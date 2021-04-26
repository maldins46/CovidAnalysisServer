const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  endpoint: {
    type: String,
    required: true
  },
  expirationTime: String,
  keys: [
    {
      p256dh: {
        type: String,
        required: true
      },
      auth: {
        type: String,
        required: true
      }
    }
  ]
});

const subscriptionModel = mongoose.model('Subscription', subscriptionSchema, 'subscriptions');
module.exports = subscriptionModel;
