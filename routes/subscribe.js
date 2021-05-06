const express = require('express')
const router = express.Router();
const Subscription = require('../models/subscription');

/* POST subscribe to notifications. */
router.post('/', async (req, res, next) => {
  const subscriber = new Subscription(req.body);

  try {
    await subscriber.save();
    res.send('Notifications subscribed!');

  } catch (e) {
    console.log('Cannot insert subscription!');
    res.status(400).send({message: 'Cannot insert the subscription.'});
  }
});

module.exports = router;
