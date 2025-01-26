const express = require('express'); // Express app
const router = express.Router();    // Router logic

const jwt = require('jsonwebtoken'); // Enable JSON Web Tokens

// Method to autheticate out JWT
function authenticateJWT(req, res, next) {
    // console.log('In Middleware');

    const authHeader = req.headers['authorization'];
    // console.log('Auth Header: ' + authHeader);

    if(authHeader == null) {

        console.log('Auth Header required but not present.');
        return res.sendStatus(401);
    }

    let headers = authHeader.split(' ');
    if(headers.length < 1) {

        console.log('Not enough tokens in Auth Header: ' + headers.length);
        return res.sendStatus(501);
    }

    const token = authHeader.split(' ')[1];
    // console.log('Token: ' + token);

    if(token == null) {

        console.log('Null Bearer Token');
        return res.sendStatus(401);
    }

    // console.log(process.env.JWT_SECRET);
    // console.log(jwt.decode(token));
    const verified = jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
        if(err) {
            return res.sendStatus(401).json('Token Validation Error.');
        }
        req.auth = verified; // Set the auth parameter to the decoded
    });
    next(); // Continue or will hang forever
}

// Import controllers for routing
const authController = require('../controllers/authentication');
const imagesController = require('../controllers/images');
const galleriesController = require('../controllers/galleries');

// POST method route login
router
    .route('/login')
    .post(authController.login);

// POST method route register
router
    .route('/register')
    .post(authController.register);

router
    .route('/images')
    .get(imagesController.getAllImages) 

router
    .route('/images/:id')
    .get(imagesController.getImageById) 

router
    .route('/galleries')
    .get(galleriesController.getAllGalleries) 

router
    .route('/galleries/:id')
    .get(galleriesController.getGalleryById) 

module.exports = router;