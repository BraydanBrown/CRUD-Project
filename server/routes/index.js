let express = require('express');
let router = express.Router();
let indexController = require('../controllers/index');

/* GET home page */
router.get(['/', '/home'], indexController.displaySplashPage);

module.exports = router;