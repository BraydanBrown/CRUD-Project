let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let user = mongoose.Schema({
    username:
    {
        type: String,
        default: "",
        trim: true,
        required: 'username is required'
    },
    /*
    password:
    {
        type: String,
        default: "",
        trim: true,
        required: 'password is required'
    },//*/
    displayName:
    {
        type: String,
        default: "",
        trim: true,
        required: 'Display Name is required'
    },
    created:
    {
        type: Date,
        default: Date.now
    },
    update: {
        type: Date,
        default: Date.now
    },
    googleId: {
        type: String,
        default: ""
    },
    githubId: {
        type: String,
        default: ""
    }
},
{
    collection: "users"
});

// configure options for User Model
let options = ({missingPasswordError: 'Wrong / Missing Password'});
user.plugin(passportLocalMongoose, options);
module.exports.user = mongoose.model('User', user);