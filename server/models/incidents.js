let mongoose = require('mongoose');

// create an incident model
let incidentModel = mongoose.Schema({
    Customer: String,
    Date: String,
    Time: String,
    Location: Number,
    Reporter: String,
    Description: String
    },
    {
        collection: "incidents"
    }
);

module.exports = mongoose.model('incident', incidentModel);

