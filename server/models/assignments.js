let mongoose = require('mongoose');

// create an incident model
let incidentModel = mongoose.Schema({
    course: String,
    title: String,
    description: String,
    weight: Number,
    due: String,
    },
    {
        collection: "incidents"
    }
);

module.exports = mongoose.model('incident', incidentModel);

