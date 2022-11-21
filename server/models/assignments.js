let mongoose = require('mongoose');

// create an assignment model
let assignmentModel = mongoose.Schema({
    course: String,
    title: String,
    description: String,
    weight: Number,
    due: String,
    },
    {
        collection: "assignments"
    }
);

module.exports = mongoose.model('assignment', assignmentModel);

