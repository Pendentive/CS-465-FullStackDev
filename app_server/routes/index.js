const express = require('express');
const router = express.Router();
const landingPageController = require('../controllers/landing-page');

/* GET home page */
router.get('/', landingPageController.landingPage);

module.exports = router;