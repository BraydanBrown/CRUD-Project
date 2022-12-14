let express = require('express');
const passport = require('passport');
let router = express.Router();
let indexController = require('../controllers/index');

/* GET home page */
router.get(['/', '/home'], indexController.displayLandingPage);

// GET login page
router.get('/login', indexController.displayLoginPage);
router.post('/login', indexController.processLoginPage);

// router.get('/github', indexController.loginUsingGitGub);
// router.get('/github', indexController.processLoginUsingGitGub);
router.get('/auth/github', passport.authenticate('github'));

router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), function (req,res) {
    res.redirect('/');
});

router.get('/login/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/oauth2/redirect/google', passport.authenticate('google', { failureRediect: '/login', failureMessage: true}), function (req, res) {
    res.redirect('/');
});

// router.get('/auth/twitter', passport.authenticate('twitter'));

// router.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login', scope: ['tweet.read', 'users.read', 'offline.access']}), function (req,res) {
//     res.redirect('/');
// });

// GET register page
router.get('/register', indexController.displayRegisterPage);
router.post('/register', indexController.processRegisterPage);

router.get('/logout', indexController.performLogout);

module.exports = router;