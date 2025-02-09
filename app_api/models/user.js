const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true, 
        required: true 
    },
    name: {
        type: String,
        required: true
    },
    hash: String,
    salt: String
});

// Set password on current record
userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt,
        1000, 64, 'sha512').toString('hex');
};

// Compare entered password against stored hash
userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password,
        this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};


// Generate a JSON Web Token for the current record
userSchema.methods.generateJwt = function() {
    const payload = {  // Payload for JSON Web Token
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // Token expires in 1 hour
    };
    return jwt.sign(payload, process.env.JWT_SECRET);   // SECRET stored in .env file
};

const User = mongoose.model('users', userSchema);
module.exports = User;