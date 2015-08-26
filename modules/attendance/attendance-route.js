var mongoose = require('mongoose'),
    passport = require('passport'),
    // Members = require('./account'),
    express = require('express'),
    router = express.Router(),
    attendance = require('./attendance');

router.get('/', function(req, res) {
    new attendance(req.body);
    if (req.body) res.status(200).json({message: req.user});
});

router.get('/roster', function(req, res) {
    attendance.find({}, function (err, result) {
        if(err) res.status(500).json(err);
        else res.status(200).json(result);
    });
});

router.post('/roster', function(req, res) {
    (new attendance(req.body)).save(function(err, result){
        if(err) res.status(500).json(err);
        else res.status(200).json({message: "POST attendance success"});
    });
});

module.exports = router;



