var express = require('express');
var router = express.Router();
var controller = require('../controllers/admin');

/* GET about page. */
router.get('/', controller.admin);

module.exports = router;