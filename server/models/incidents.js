let mongoose = require('mongoose');

// create an incident model
let incidentModel = mongoose.Schema({
    customer: String,
    date: String,
    time: String,
    location: String,
    reporter: String,
    description: String
    },
    {
        collection: "incidents"
    }
);

module.exports = mongoose.model('incident', incidentModel);

