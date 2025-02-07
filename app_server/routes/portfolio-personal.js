const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolio-personal');

/* GET portfolio pages */
router.get('/', portfolioController.portfolioPersonal);

module.exports = router;