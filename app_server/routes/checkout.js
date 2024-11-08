var express = require('express');
var router = express.Router();
var controller = require('../controllers/checkout');

/* GET contact page. */
router.get('/', controller.checkout);

module.exports = router;