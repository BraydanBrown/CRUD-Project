let express = require('express');
let router = express.Router();
let indexController = require('../controllers/index');
const passport = require('passport');
const { runInNewContext } = require('vm');
const { nextTick } = require('process');
const app = require('../config/app.js');
require('../config/app.js')

function isLoggedIn(req, res, next){
    req.user ? next() : res.sendStatus()
}

/* GET home page */
router.get(['/', '/home'], indexController.displayLandingPage);

// GET login page
router.get('/login', indexController.displayLoginPage);
router.post('/login', indexController.processLoginPage);

// router.get('/google', indexController.loginUsingGoogle);
// router.get('/github', indexController.processLoginUsingGoogle);
router.get('/google',passport.authenticate('google'), (req,res) => {
    console.log('in first')
});
router.get('google', 
    passport.authenticate('/app/google', { scope: ['email', 'profile']}), (req,res) =>{
        console.log('in')
        res.redirect('/incident-list');
    });

router.get('/google/callback',
        passport.authenticate('google', {
            successRedirect: '/incident-list',
            failureRedirect: 'auth-login',
        }));

// GET register page
router.get('/register', indexController.displayRegisterPage);
router.post('/register', indexController.processRegisterPage);

router.get('/logout', indexController.performLogout);

module.exports = router;