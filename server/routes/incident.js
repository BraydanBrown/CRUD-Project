let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//connect to incident Model
let incident = require('../models/incidents');
//connect to Controller folder, which has the CRUD functions
let databaseController = require('../controllers/incident');

function requireAuth(req, res, next) {
    // check if the user is logged in
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

/* CRUD OPERATIONS */

// Get route for the incident list page - READ Operation
// READ OPERATION
router.get('/', databaseController.displayDatabase);

// ADD OPERATION
// get route for displaying the Add-Page Content
router.get('/add', requireAuth, databaseController.displayAddPage);

// post route for processing the Add-Page Content
router.post('/add', requireAuth, databaseController.processAddPage);

// EDIT OPERATION
// get route for processing the Edit-Page Content
router.get('/edit/:id', requireAuth, databaseController.displayEditPage);

// post route for processing the Edit-Page Content
router.post('/edit/:id', requireAuth, databaseController.processEditPage);

// DELETE OPERATION
// get route deleting content
router.get('/delete/:id', requireAuth, databaseController.performDelete);

module.exports = router;
