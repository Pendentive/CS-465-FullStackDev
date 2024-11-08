var express = express = require('express');
var router = express.Router();
var controller = require('../controllers/login');

/* GET Meals page. */
router.get('/', controller.login);

module.exports = router;