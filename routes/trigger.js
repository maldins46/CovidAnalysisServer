/*
 * Copyright (c) 2021 Riccardo Maldini.
 *
 * This file is part of the CovidAnalysis project, and is distributed under the terms of
 * the MIT License, as described in the file LICENSE in the repository's top directory.
 *
 */

const express = require('express');
const router = express.Router();
const webpush = require('web-push');
const Subscription = require('../models/subscription');

const getNotification = (type) => {
  switch (type) {
    case 'covid':
      return {
        triggerType: 'covid',
        title: 'Dati sui contagi aggiornati!',
        body: 'I grafici sui contagi sono stati appena aggiornati! Consultali subito dall\'app.'
      };
    case 'vaccines':
      return {
        triggerType: 'vaccines',
        title: 'Dati sui vaccini aggiornati!',
        body: 'I grafici sui vaccini sono stati appena aggiornati! Consultali subito dall\'app.'
      }
    default:
      return {
        triggerType: 'generic',
        title: 'Dati aggiornati!',
        body: 'I grafici sono stati appena aggiornati! Consultali subito dall\'app.'
      }
  }
}


/* GET trigger new covid notification. */
router.get('/:id', async (req, res, next) => {
  const notification = getNotification(req.params.id)

  let subscribers = [];
  try {
    subscribers = await Subscription.find();
  } catch (e) {
    console.log("Error fetching subscribers.");
    res.status(500).send({message: 'Error fetching subscribers.'});
    return;
  }

  webpush.setVapidDetails(
    'https://maldins46.github.io/CovidAnalysis',
    process.env.PUBLIC_KEY,
    process.env.PRIVATE_KEY
  );

  const sendNotsPromises = subscribers.map((sub) =>
    webpush.sendNotification(sub, JSON.stringify(notification))
  )

  try {
    await Promise.all(sendNotsPromises);
    res.send({
      message: `Notification for ${ notification.triggerType } sent successfully to all subscribers!`,
      type: notification.triggerType
    });
  } catch (e) {
    console.log('Unable to send messages to all subscribers.');
    res.status(500).send({
      message: 'Unable to send messages to all subscribers.',
      type: notification.triggerType
    })
  }
});

module.exports = router;
