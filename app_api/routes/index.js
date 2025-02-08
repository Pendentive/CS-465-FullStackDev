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
        req.auth = verified; // Set the auth parameter to the decoded payload
        next(); // Continue or will hang forever
    });
}

// Import controllers for routing
const authController = require('../controllers/authentication');
const imagesController = require('../controllers/images');
const galleryGridController = require('../controllers/gallery-grid');
const galleryHeroVertController = require('../controllers/gallery-hero-vert');
const typeIntroController = require('../controllers/type-intro');
const galleryBannerController = require('../controllers/gallery-banner');
const repeaterMenuController = require('../controllers/repeater-menu');
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

// Define routes for gallery-grid endpoint
router
    .route('/gallery-grid')
    .get(galleryGridController.getAllGalleryGrid);

router
    .route('/gallery-grid/:id')
    .get(galleryGridController.getGalleryGridById);

// Define routes for gallery-hero-vert endpoint
router
    .route('/gallery-hero-vert')
    .get(galleryHeroVertController.getAllGalleryHeroVert);

router
    .route('/gallery-hero-vert/:id')
    .get(galleryHeroVertController.getGalleryHeroVertById);

// Define routes for type-intro endpoint
router
    .route('/type-intro')
    .get(typeIntroController.getAllTypeIntro);

router
    .route('/type-intro/:id')
    .get(typeIntroController.getTypeIntroById)
    .put(authenticateJWT, typeIntroController.updateTypeIntro);

// Define routes for gallery-banner endpoint
router
    .route('/gallery-banner')
    .get(galleryBannerController.getAllGalleryBanner);

router
    .route('/gallery-banner/:id')
    .get(galleryBannerController.getGalleryBannerById);

// Define routes for repeater-menu endpoint
router
    .route('/repeater-menu')
    .get(repeaterMenuController.getAllRepeaterMenu);

router
    .route('/repeater-menu/:id')
    .get(repeaterMenuController.getRepeaterMenuById);

// Define routes for page endpoint
router
    .route('/pages')
    .get(pageController.getAllPages)
    .post(authenticateJWT, pageController.createPage);

router
    .route('/pages/:id')
    .get(pageController.getPageById)
    .put(authenticateJWT, pageController.updatePage)
    .delete(authenticateJWT, pageController.deletePage);

router
    .route('/pages/identifier/:identifier')
    .get(pageController.getPageByIdentifier);

// Define routes for updating a specific component
router
    .route('/components/:componentType/:componentId')
    .put(authenticateJWT, pageController.updateComponent);

router.route('/components/:componentType')
    .get(componentController.getAllComponents); 

router
    .route('/components/:componentType/:id')
    .get(componentController.getComponentById) 
    .put(authenticateJWT, pageController.updateComponent); 

module.exports = router;