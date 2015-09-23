var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    IpInfo = require("ipinfo");;

var Attendance = new Schema({
    date: Date,
    userId: String, // TODO: use ObjectId instead of String
    action: String,  // checkin or checkout
    geocode: Array,  // ["latitude, longitude"]
    ipAddress: String,
    team: String
});

module.exports = mongoose.model('Attendance', Attendance);

