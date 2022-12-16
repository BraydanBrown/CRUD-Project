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

router.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }),
    function(req, res){
    }
);

module.exports = router;