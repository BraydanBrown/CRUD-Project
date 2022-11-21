let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//connect with database model
let assignment = require('../models/assignments');

/* CRUD Operations */
module.exports.displayDatabase = (req, res, next) => {
    assignment.find((err, assignmentsList) => {
        if(err) {
            return console.error(err);
        }
        else {
            // console.log(assignmentsList);
            res.render('assignment/list', {
                title:'Assignment List', 
                assignmentsList: assignmentsList
            });
        }
    });
}

// Display add page
module.exports.displayAddPage = (req, res, next) => {
    res.render('assignment/add', {
        title: 'Add Assignment' 
    });
}

// Process add page
module.exports.processAddPage = (req, res, next) => {
    let newAssignment = assignment({
        "course": req.body.course,
        "title": req.body.title,
        "description": req.body.description,
        "weight": req.body.weight,
        "due": req.body.due
    });

    assignment.create(newAssignment, (err, assignment) => {
        if(err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/assignment-list');
        }
    });
}

// Display edit page
module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;
    assignment.findById(id, (err, assignmentToEdit) => {
        if(err) {
            console.log(err);
            res.end(err);
        } else {
            res.render('assignment/edit', {
                title: 'Edit assignment',
                assignment: assignmentToEdit
            });
        }
    });
}

// Process edit page
module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;
    let updateAssignment = assignment({
        "_id": id,
        "course": req.body.course,
        "title": req.body.title,
        "description": req.body.description,
        "weight": req.body.weight,
        "due": req.body.due
    });

    assignment.updateOne({_id: id}, updateAssignment, (err) => {
        if(err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/assignment-list');
        }
    });
}

// Perform delete action
module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;
    assignment.deleteOne({_id: id}, (err) => {
        if(err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/assignment-list');
        }
    });
}