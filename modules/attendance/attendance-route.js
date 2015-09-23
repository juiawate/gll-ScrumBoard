var mongoose = require('mongoose'),
    passport = require('passport'),
    Members = require('./../authentication/account'),
    express = require('express'),
    router = express.Router(),
    attendance = require('./attendance'),
    IpInfo = require("ipinfo");

var location = 0;
function getLoc (newLoc){
    location = newLoc;
}
IpInfo(function (err, cLoc) {
    getLoc(cLoc);
});

router.get('/', function(req, res) {
    new attendance(req.body);
    if (req.body) res.status(200).json({message: req.user});
});

router.route('/roster')
    .post(function(req, res) {
        req.body.ipAddress = location.ip;
        req.body.team = req.user.team;
        new attendance(req.body).save(function(err, result){
            if(err) res.status(500).json(err);
            else res.status(200).json(result);
        });
    })
    .get(function(req, res) {
        console.log('line 32 of att-r' + req + ' : ' + req.user + ', ' + req.query);
        attendance.find(req.query, function (err, result) {
            console.log('line 34 of att-r:', result);
            if(err) res.status(500).json(err);
            else res.status(200).json({message: result});
        }).sort({"date": -1});
    });

module.exports = router;



