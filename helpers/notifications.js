/*
 * Copyright (c) 2021 Riccardo Maldini.
 *
 * This file is part of the CovidAnalysis project, and is distributed under the terms of
 * the MIT License, as described in the file LICENSE in the repository's top directory.
 *
 */

const serverURL = process.env.ENV === 'production' ? process.env.SERVER_URL :  process.env.SERVER_DEV_URL

/**
 * Returns the notification payload as stated in the Notification API, according
 * to the notification type.
 * @param type {String} The notification type.
 * @returns {{notification: {badge: string, icon: string, title: string, lang: string, body: string, actions: [{action: string, title: string}], timestamp: string}, triggerType: string}}
 */
module.exports.getNotification = (type) => {
  switch (type) {
    case 'covid':
      return {
        triggerType: 'covid',
        notification: {
          title: 'Dati sui contagi aggiornati!',
          lang: 'it',
          icon: `${serverURL}/images/charts-icon.png`,
          badge: `${serverURL}/images/badge.png`,
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
          badge: `${serverURL}/images/badge.png`,
          icon: `${serverURL}/images/vaccines-icon.png`,
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
          icon: `${serverURL}/images/default-icon.png`,
          badge: `${serverURL}/images/badge.png`,
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

