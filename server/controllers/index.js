let express = require('express');
let router = express.Router();

// Displays the landing page page
module.exports.displayLandingPage = (req, res, next) => {
    res.render('index', { title: 'Landing Page' });
}

module.exports = displayLoginPage = (req, res, next) => {
    if (!req.user) {
        res.render('auth/login', {
            title: 'Login',
            message: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    } else {
        return res.redirect('/');
    }
    // res.render('index', { title: 'Login Page' });
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        // server error?
        if (err) {
            return next(err);
        }
        // is there a user login error?
        if (!user) {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            // server error?
            if (err) {
                return next(err);
            }
            return res.redirect('/incident-list');
        });
    })(req, res, next);
}