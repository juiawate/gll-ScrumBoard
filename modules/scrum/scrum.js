var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Scrum = new Schema({
    backlogItems: String
});

module.exports = mongoose.model('Scrum', Scrum);
