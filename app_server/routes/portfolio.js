const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolio');

/* GET portfolio pages */
router.get('/personal', portfolioController.portfolioPersonal);

module.exports = router;