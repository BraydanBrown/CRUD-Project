let express = require('express');
const passport = require('passport');
let router = express.Router();

let userModel = require('../models/user');
let user = userModel.user;

// Displays the landing page page
module.exports.displayLandingPage = (req, res, next) => {
    res.render('index', { title: 'Landing Page', displayName: req.user ? req.user.displayName : '' });
}

module.exports.displayLoginPage = (req, res, next) => {
    if (!req.user) {
        res.render('auth/login', {
            title: 'Login',
            message: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    } else {
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        // server error?
        if (err) {
            return next(err);
        }
        // is there a user login error?
        if (!user) {
            req.flash('loginMessage', 'Incorrect username or password');
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

module.exports.displayRegisterPage = (req, res, next) => {
    // check if the user is not already logged in
    if (!req.user) {
        res.render('auth/register', {
            title: 'Register',
            message: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    } else {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    let newUser = new user({
        username: req.body.username,
        //password: req.body.password,
        email: req.body.email,
        displayName: req.body.displayName
    });
    user.register(newUser, req.body.password, (err) => {
        if (err) {
            console.log('Error: Inserting New User');
            if (err.name == "UserExistsError") {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log('Error: User Already Exists!');
            }
            return res.render('auth/register', {
                title: 'Register',
                message: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        } else {
            // if no error exists, then registration is successful
            // redirect the user and authenticate them
            return passport.authenticate('local')(req, res, () => {
                res.redirect('/incident-list');
            });
        }
    });
}

module.exports.performLogout = (req, res, next) => {
    req.logout(function(err) {
        if(err) {
            return next(err);
    }});
    res.redirect('/');
}