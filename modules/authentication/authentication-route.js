var mongoose = require('mongoose'),
    passport = require('passport'),
    Members = require('./account'),
    express = require('express'),
    router = express.Router(),
    IpInfo = require("ipinfo");

var location = 0;
function getLoc (newLoc){
    location = newLoc;
}
IpInfo(function (err, cLoc) {
    getLoc(cLoc);
});

router.get('/', function(req, res) {
    if (req.user) res.status(200).json({message: req.user});
});

router.get('/all', function (req,res) {
    Members.find({type: "Member", status:"in"}, function(err, p){
        if (p) res.status(200).json({message: p});
    });
});

router.get('/dash', function (req,res) {
    console.log('line 27 of auth-r:',req.user);
    if(req.user.type === 'Admin'){
        res.status(200).json({message: req.user});
    }
    else{
        console.log('forbidden');
        res.redirect('/#/home');
        res.status(403);
    }

});

router.get('/validate', function(req, res) {
        if (req.user){
            res.status(200).json({ user: {
                name: req.user.name,
                id: req.user._id,
                ipAddress: location.ip,
                userId: req.user.username,
                date: new Date(),
                type: req.user.type,
                status: req.user.status,
                timestamp: req.user.timestamp,
                geocode: req.user.geocode
            } });
        }
        else res.status(401).json({user: null});
    });

router.patch('/status',function (req,res) {
        req.params.id = {username:req.body.userId};
        Members.find(req.params.id, function (err, p) {
            p.timestamp = new Date();
            p.ipAddress = location.ip;
            if(!p){
                console.log('failed',p);
                return undefined;
            }
            else{
                if(req.body.action === 'checkout'){
                    p.status = 'out';
                }
                else if(req.body.action === 'checkin'){
                    p.status = 'in';
                }
                Members.update( {username: req.body.userId},{$set:{status: p.status, timestamp: p.timestamp, ipAddress: p.ipAddress, geocode: req.body.geocode}},function (err) {
                    if(err){
                        console.log('Error');
                    }
                    else{
                        console.log('Success');
                    }
                });
            }
        });
    });

router.get('/register', function(req, res) {
    res.render('register', {});
});

router.post('/register', function(req, res, next) {
    //console.log('registering user');
    Members.register(new Members(req.body), req.body.password, function (err) {
        if (err) {
            console.log('Error while registering user!', err);
            res.status(400).json({message: err.message});
        } else {
            console.log('User registered successfully!');
            res.status(200).json({message: "User registered successfully"});
        }
    });
});

router.get('/login', function(req, res) {
    //console.log('login get request: ',req.user);
    res.render('login', { user: req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    if(req.user){
        res.status(200).json({user: {
            name: req.user.name,
            id: req.user._id,
            userId: req.user.username,
            type: req.user.type
        }});
    }
});


router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({message: 'Logged out successfully!'});
});
module.exports = router;
