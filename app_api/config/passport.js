const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    async(username, password, done) => {
        const q = await User
            .findOne({ email: username })
            .exec();

            // Uncomment the following line to show results of query
            // console.log(q);

            if(!q) {// If the DB return no records, the user doesn't exits
                return done(null, false, {message: 'Incorrect Username'});
            }
            if(!q.validPassword(password)) { // Validate password
                return done(null, false , {message: 'Incorrect Password'});
            }
            return done(null, q); // Everything is OK, return user object
    }
));