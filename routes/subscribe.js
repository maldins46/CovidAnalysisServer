var express = require('express');
var router = express.Router();
const Subscription = require('../models/subscription')

/* POST subscribe to notifications. */
router.post('/', async (req, res, next) => {

  const subscriber = new Subscription(req.body);

  // necessary?
  // const error = subscriber.validateSync();
  // if (error) {
  //   res.status(400).send({message: 'Subscription not well formed.'});
  //   return;
  // }

  try {
    await subscriber.save();
    res.send('Notifications subscribed!');

  } catch (e) {
    console.error('Cannot insert subscription.', e);
    res.status(400).send({message: 'Cannot insert the subscription.'});
  }
});

module.exports = router;
