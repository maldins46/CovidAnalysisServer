const webpush = require('web-push');
const Subscription = require('../models/subscription')
const config = require('../config.json')


const sendNotifications = async (notification, res) => {
  // Get all subscribers
  let subscribers = [];
  try {
    subscribers = await Subscription.find();
  } catch (e) {
    console.error("Error sending subscribers, reason: ", e);
    res.send(500, {message: 'Error fetching subscribers.'});
    return;
  }

  webpush.setVapidDetails(
    'https://maldins46.github.io/CovidAnalysis',
    config.publicKey,
    config.privateKey
  );

  const sendNotsPromises = subscribers.map((subscriber)=> {
    return webpush.sendNotification(subscriber, JSON.stringify(notification))
      .catch(e => {
        console.error("Error sending notification, reason: ", e);
      });
  })

  try {
    await Promise.all(sendNotsPromises);
    res.send({message: 'Notification sent successfully to all subscribers.'});
  } catch (e) {
    res.status(500).send({message: 'Unable to send messages to all subscribers.'})
  }
}

module.exports.sendNotifications = sendNotifications
