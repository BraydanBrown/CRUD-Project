let express = require('express');
let router = express.Router();
let indexController = require('../controllers/index');
let passport = require('passport');

/* GET home page */
router.get(['/', '/home'], indexController.displayLandingPage);

// GET login page
router.get('/login', indexController.displayLoginPage);
router.post('/login', indexController.processLoginPage);

// GET register page
router.get('/register', indexController.displayRegisterPage);
router.post('/register', indexController.processRegisterPage);

router.get('/logout', indexController.performLogout);

router.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), 
    function(req, res) {
        res.redirect('/');
    }
);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/oauth2/redirect/google', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login', failureFlash: true, successFlash: "Welcome!"}),
    function(req, res) {
        res.redirect('/');
    }
);

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login'}),
    function(req, res) {
        res.redirect('/');
    }
);

module.exports = router;