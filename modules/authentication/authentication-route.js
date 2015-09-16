var mongoose = require('mongoose'),
    passport = require('passport'),
    Members = require('./account'),
    express = require('express'),
    router = express.Router();

router.get('/', function(req, res) {
    if (req.user) res.status(200).json({message: req.user});
});

router.get('/all', function (req,res) {
    Members.find({type: "Member", status:"in"}, function(err, p){
        if (p) res.status(200).json({message: p});
    });
});

router.get('/validate', function(req, res) {
        if (req.user){
            res.status(200).json({ user: {
                name: req.user.name,
                id: req.user._id,
                ipAddress: 4752374368,
                userId: req.user.username,
                date: new Date(),
                type: req.user.type,
                status: req.user.status
            } });
        }
        else res.status(401).json({user: null});
    });

router.patch('/status',function (req,res) {
        req.params.id = {username:req.body.userId};
        Members.find(req.params.id, function (err, p) {
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
                console.log('line 46 of auth-r',req.body.userId, p);
                console.log('status from line 47 of auth-r', p.status);
                Members.update( {username: req.body.userId},{$set:{status: p.status}},function (err) {
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
            userId: req.user.username
        }});
    }
});


router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({message: 'Logged out successfully!'});
});
module.exports = router;
