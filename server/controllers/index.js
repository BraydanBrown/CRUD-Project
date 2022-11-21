let express = require('express');
let router = express.Router();

// Displays the splash page
module.exports.displaySplashPage = (req, res, next) => {
    res.render('index', { title: 'Splash' });
}