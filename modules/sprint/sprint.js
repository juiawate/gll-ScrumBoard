var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Sprint = new Schema({
    scrumId: ObjectId,
    teamId: String,
    backlogItems: String,
    teamStatus: String
});

module.exports = mongoose.model('Sprint', Sprint);
