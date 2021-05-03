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
        required: true
      },
      auth: {
        type: String,
        required: true
      }
    }
});

module.exports.model = mongoose.model('Subscription', subscriptionSchema, 'subscriptions');

module.exports.mockSub = {
  "endpoint": "https://fcm.googleapis.com/fcm/send/eBCNqyXhGhk:APA91bHMOiiwQjXbBf7ffziwrgci4-gOGbAWqOsCoN0mQHIqPkPPiqLHw99HOdda0-oKrWju3fi4PIstOQ6UJVjwO-oB47cjyGrU3z48e6tdyB2Gm0bULEltFoI6h6tMZ2io5WBnQFg-",
  "expirationTime": null,
  "keys": {
    "p256dh": "BDx0xKFyA-PF1–2E7cupnrMpQij9zE-HXEuTQtJ0ghhtis2H2hAyezWdtLCTfib8V4UXls3yu2dpK0drL-ycU00",
    "auth": "L0lMJwwSW0fc1IkAMSK2wA"
  }
}
