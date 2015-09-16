var mongoose = require('mongoose'),
    passport = require('passport'),
    Members = require('./../authentication/account'),
    express = require('express'),
    router = express.Router(),
    attendance = require('./attendance'),
    IpInfo = require("ipinfo");

router.get('/', function(req, res) {
    new attendance(req.body);
    if (req.body) res.status(200).json({message: req.user});
});

router.route('/roster')
    .post(function(req, res) {
        console.log('line 23 of att-r', req.body);
        new attendance(req.body).save(function(err, result){
            if(err) res.status(500).json(err);
            else res.status(200).json(result);
        });
    })
    .get(function(req, res) {
        attendance.find(req.query, function (err, result) {
            if(err) res.status(500).json(err);
            else res.status(200).json(result);
        });
    });

module.exports = router;



