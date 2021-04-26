var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Notifications subscribed for user!');
});

module.exports = router;
