var express = require('express');
var router = express.Router();
var controller = require('../controllers/reservations');

/* GET news page. */
router.get('/', controller.reservations);

module.exports = router;