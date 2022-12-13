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
router.get('/github',passport.authenticate('github'));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
    // Successful authentication, redirect to incident-list.
    passport.authenticate('github')(req, res, () => {
        res.redirect('/incident-list');
    })
});

// GET register page
router.get('/register', indexController.displayRegisterPage);
router.post('/register', indexController.processRegisterPage);

router.get('/logout', indexController.performLogout);

module.exports = router;