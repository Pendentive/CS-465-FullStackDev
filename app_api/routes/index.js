const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Method to authenticate out JWT
function authenticateJWT(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        console.log('Auth Header required but not present.');
        return res.sendStatus(401);
    }

    let headers = authHeader.split(' ');
    if (headers.length < 1) {
        console.log('Not enough tokens in Auth Header: ' + headers.length);
        return res.sendStatus(501);
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        console.log('Null Bearer Token');
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
        if (err) {
            console.log('Token Validation Error:', err.message);
            return res.status(401).json({ message: 'Token Validation Error.' });
        }
        req.user = verified; // Set the user object to the request
        next(); // Continue or will hang forever
    });
}

// Import controllers for routing
const authController = require('../controllers/authentication');
const imagesController = require('../controllers/images');
const pageController = require('../controllers/page');
const componentController = require('../controllers/component');

// POST method route login
router
    .route('/login')
    .post(authController.login);

// POST method route register
router
    .route('/register')
    .post(authController.register);

// POST method route for service token
router
    .route('/service-token')
    .post(authController.getServiceToken);

// Define routes for images endpoint
router
    .route('/images')
    .get(imagesController.getAllImages);

router
    .route('/images/:id')
    .get(imagesController.getImageById);

// Define routes for page endpoint
router
    .route('/pages')
    .get(pageController.getAllPages)
    .post(authenticateJWT, pageController.createPage);

router
    .route('/pages/identifier/:identifier')
    .get(authenticateJWT, pageController.getPageByIdentifier)
    .put(authenticateJWT, pageController.updatePageByIdentifier);

router
    .route('/pages/:id')
    .get(pageController.getPageById)
    .put(authenticateJWT, pageController.updatePageById)
    .delete(authenticateJWT, pageController.deletePage);

// Define routes for updating a specific component
router
    .route('/components/:componentType/:id')
    .get(componentController.getComponentById) 
    .put(authenticateJWT, componentController.updateComponent);

router.route('/components/:componentType')
    .get(componentController.getAllComponents); 

module.exports = router;