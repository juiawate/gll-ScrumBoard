// this is a mongoose helper file

var mongoose = require('mongoose');
var uuid = require('uuid');

var attendance = mongoose.Schema({
    date: Date,
    userId: ObjectId,
    action: String,  // checkin or checkout
    geocode: Array,  // [latitude, longitude]
    ipAddress: String
});

var scrum = mongoose.Schema({
    backlogItems: String
});

var sprint = mongoose.Schema({
    scrumId: ObjectId,
    teamId: String,
    backlogItems: String,
    teamStatus: String
});

var daily = mongoose.Schema({
    date: Date,
    sprintId: ObjectId,
    backlogItem: String,
    userId: ObjectId,
    grade: String,
    comment: String,
    status: String,   // To do, In Progress, Blocked, In Review, or Done
    git_repo: String
});

