var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Attendance = new Schema({
    date: Date,
    userId: ObjectId,
    action: String,  // checkin or checkout
    geocode: Array,  // [latitude, longitude]
    ipAddress: String
});

module.exports = mongoose.model('Attendance', Attendance);