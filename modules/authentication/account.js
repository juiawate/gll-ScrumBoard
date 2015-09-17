var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Members = new Schema({
    email: String,
    name: String,
    type: String,
    team: String,
    url_git: String,
    status: String,
    timestamp: Date,
    ipAddress: String,
    geocode: Array
});

Members.plugin(passportLocalMongoose);

module.exports = mongoose.model('Members', Members);