let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//connect with database model
let incident = require('../models/incidents');

/* CRUD Operations */
module.exports.displayDatabase = (req, res, next) => {
    incident.find((err, incidentsList) => {
        if(err) {
            return console.error(err);
        }
        else {
            // console.log(incidentsList);
            res.render('incident/list', {
                title:'incident List', 
                incidentsList: incidentsList
            });
        }
    });
}

// Display add page
module.exports.displayAddPage = (req, res, next) => {
    res.render('incident/add', {
        title: 'Add incident' 
    });
}

// Process add page
module.exports.processAddPage = (req, res, next) => {
    let newincident = incident({
        "course": req.body.course,
        "title": req.body.title,
        "description": req.body.description,
        "weight": req.body.weight,
        "due": req.body.due
    });

    incident.create(newincident, (err, incident) => {
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
    incident.findById(id, (err, incidentToEdit) => {
        if(err) {
            console.log(err);
            res.end(err);
        } else {
            res.render('incident/edit', {
                title: 'Edit incident',
                incident: incidentToEdit
            });
        }
    });
}

// Process edit page
module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;
    let updateincident = incident({
        "_id": id,
        "course": req.body.course,
        "title": req.body.title,
        "description": req.body.description,
        "weight": req.body.weight,
        "due": req.body.due
    });

    incident.updateOne({_id: id}, updateincident, (err) => {
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
    incident.deleteOne({_id: id}, (err) => {
        if(err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/incident-list');
        }
    });
}