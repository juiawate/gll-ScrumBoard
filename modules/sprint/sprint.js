var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Sprint = new Schema({
    scrumId: ObjectId,
    teamId: String,
    backlogItems: String,
    teamStatus: String
});

module.exports = mongoose.model('Sprint', Sprint);
