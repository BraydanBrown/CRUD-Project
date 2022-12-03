let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//connect with database model
let incidentData = require('../models/incidents');

/* CRUD Operations */
module.exports.displayDatabase = (req, res, next) => {
    incidentData.find((err, incidentsList) => {
        if(err) {
            return console.error(err);
        }
        else {
            // console.log(incidentsList);
            res.render('incident/list', {
                title:'Incident Records', 
                incidentsList: incidentsList,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
}

// Display add page
module.exports.displayAddPage = (req, res, next) => {
    res.render('incident/add', {
        title: 'Add Incident',
        displayName: req.user ? req.user.displayName : ''
    });
}

// Process add page
module.exports.processAddPage = (req, res, next) => {
    let newIncident = incidentData({
        "customer": req.body.customer,
        "date": req.body.date,
        "time": req.body.time,
        "location": req.body.location,
        "reporter": req.body.reporter,
        "description": req.body.description
    });

    incidentData.create(newIncident, (err, incidentData) => {
        if(err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/incident-list');
        }
    });
}

// Display edit page
module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;
    incidentData.findById(id, (err, incidentToEdit) => {
        if(err) {
            console.log(err);
            res.end(err);
        } else {
            res.render('incident/edit', {
                title: 'Edit Incident',
                incidentData: incidentToEdit,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
}

// Process edit page
module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;
    let updateIncident = incidentData({
        "_id": id,
        "customer": req.body.customer,
        "date": req.body.date,
        "time": req.body.time,
        "location": req.body.location,
        "reporter": req.body.reporter,
        "description": req.body.description
    });

    incidentData.updateOne({_id: id}, updateIncident, (err) => {
        if(err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/incident-list');
        }
    });
}

// Perform delete action
module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;
    incidentData.deleteOne({_id: id}, (err) => {
        if(err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/incident-list');
        }
    });
}