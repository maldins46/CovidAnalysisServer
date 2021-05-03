var express = require('express');
var router = express.Router();
const Subscription = require('../models/subscription').model;

/* POST subscribe to notifications. */
router.post('/', async (req, res, next) => {
  const subscriber = new Subscription(req.body);

  try {
    await subscriber.save();
    res.send('Notifications subscribed!');

  } catch (e) {
    console.error('Cannot insert subscription.', e);
    res.status(400).send({message: 'Cannot insert the subscription.'});
  }
});

module.exports = router;
