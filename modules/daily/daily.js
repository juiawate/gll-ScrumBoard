var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Daily = new Schema({
    date: Date,
    sprintId: ObjectId,
    backlogItem: String,
    userId: ObjectId,
    grade: String,
    comment: String,
    status: String,   // To do, In Progress, Blocked, In Review, or Done
    git_repo: String
});

module.exports = mongoose.model('Daily', Daily);
