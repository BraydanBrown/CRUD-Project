let express = require('express');
let router = express.Router();

// Displays the landing page page
module.exports.displayLandingPage = (req, res, next) => {
    res.render('index', { title: 'Landing Page' });
}