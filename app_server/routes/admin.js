var express = require('express');
var router = express.Router();
var controller = require('../controllers/admin');

/* GET admin page. */
router.get('/', controller.admin);

module.exports = router;