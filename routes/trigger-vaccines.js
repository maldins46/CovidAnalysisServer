var express = require('express');
var router = express.Router();
const routeUtils = require('./routeUtils');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const notification = {};
  await routeUtils.sendNotifications(notification, res);
});

module.exports = router;
