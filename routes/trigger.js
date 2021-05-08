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
        notification: {
          title: 'Dati sui contagi aggiornati!',
          lang: 'it',
          icon: 'https://covid-analysis-server.herokuapp.com/images/default-icon.png',
          badge: 'https://covid-analysis-server.herokuapp.com/images/badge.png',
          body: 'I grafici sull\'andamento contagi sono appena stati aggiornati! Consultali subito su CovidAnalysis.',
          timestamp: Date.now().toString(),
          actions: [
            {
              action: 'covid-action',
              title: 'Vai al sito',
            }
          ]
        }
      };
    case 'vaccines':
      return {
        triggerType: 'vaccines',
        notification: {
          title: 'Dati sui vaccini aggiornati!',
          lang: 'it',
          badge: 'https://covid-analysis-server.herokuapp.com/images/badge.png',
          icon: 'https://covid-analysis-server.herokuapp.com/images/vaccines-icon.png',
          body: 'I grafici sui vaccini sono appena stati aggiornati! Consultali subito su CovidAnalisys.',
          timestamp: Date.now().toString(),
          actions: [
            {
              action: 'vaccines-action',
              title: 'Vai al sito',
            }
          ]
        }
      }
    default:
      return {
        triggerType: 'generic',
        notification: {
          title: 'Dati aggiornati!',
          lang: 'it',
          icon: 'https://covid-analysis-server.herokuapp.com/images/default-icon.png',
          badge: 'https://covid-analysis-server.herokuapp.com/images/badge.png',
          body: 'I grafici sono stati appena stati aggiornati! Consultali subito su CovidAnalysis.',
          timestamp: Date.now().toString(),
          actions: [
            {
              action: 'covid-action',
              title: 'Vai al sito',
            }
          ]
        }
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
    res.status(500).send({ message: 'Error fetching subscribers.' });
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
