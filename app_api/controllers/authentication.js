const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const sendJSONresponse = (res, status, content) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.status(status);
  res.json(content);
};

module.exports.register = (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }

  const user = new User();

  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  user.save(err => {
    if (err) {
      sendJSONresponse(res, 404, err);
    } else {
      const token = user.generateJwt();
      sendJSONresponse(res, 200, { "token": token });
    }
  });
};

module.exports.login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }

  passport.authenticate('local', (err, user, info) => {
    let token;

    if (err) {
      sendJSONresponse(res, 404, err);
      return;
    }

    if (user) {
      token = user.generateJwt();
      sendJSONresponse(res, 200, { "token": token });
    } else {
      sendJSONresponse(res, 401, info);
    }
  })(req, res);
};

module.exports.getServiceToken = async (req, res) => {
  const serviceAccountEmail = process.env.EXPRESS_FRONTEND_EMAIL;
  const serviceAccountPassword = process.env.EXPRESS_FRONTEND_PASSWORD;

  if (!req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }

  if (req.body.email === serviceAccountEmail && req.body.password === serviceAccountPassword) {
    try {
      // Find the service account user
      const user = await User.findOne({ email: serviceAccountEmail });

      if (!user) {
        sendJSONresponse(res, 404, { "message": "Service account not found" });
        return;
      }

      // Generate a JWT token for the service account
      const token = user.generateJwt();
      sendJSONresponse(res, 200, { "token": token });
    } catch (err) {
      console.error('Error finding service account:', err);
      sendJSONresponse(res, 500, { "message": "Error finding service account" });
    }
  } else {
    sendJSONresponse(res, 401, { "message": "Invalid credentials" });
  }
};