var mongoose = require('mongoose'),
    passport = require('passport'),
    Members = require('./account'),
    express = require('express'),
    router = express.Router();

router.get('/', function(req, res) {
    if (req.user) res.status(200).json({message: req.user});
});

router.get('/validate', function(req, res) {


    console.log('line 14 of a-r',req.user);
    if (req.user){
        res.status(200).json({ user: {
            name: req.user.name,
            id: req.user._id,
            ipAddress: 4752374368,
            userId: req.user.username,
            date: new Date(),
            type: req.user.type,
            action: '',
            status: 'out'
        } });
    }
    else res.status(401).json({user: null});

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
            userId: req.user.username
        }});
    }
});


router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({message: 'Logged out successfully!'});
});
module.exports = router;
