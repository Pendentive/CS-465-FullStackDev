var express = require('express');
var router = express.Router();
var controller = require('../controllers/checkout');

/* GET checkout page. */
router.get('/', controller.checkout);

module.exports = router;