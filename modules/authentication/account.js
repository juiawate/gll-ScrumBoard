var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Members = new Schema({
    email: String,
    name: String,
    type: String,
    team: String,
    url_git: String
});

Members.plugin(passportLocalMongoose);

module.exports = mongoose.model('Members', Members);