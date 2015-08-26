var express = require('express'),
    router = express.Router(),
    Sprint = require('./sprint');

router.get('/', function(req, res) {
    res.render('sprint',{});
});

router.get('/getSprintItems/:id', function(req, res) {
    Sprint.find({_id: req.params.id}, function (err, result) {
        if(err) res.status(500).json(err);
        else res.status(200).json(result);
    });
});

router.post('/addSprint', function(req, res) {
    (new Sprint(req.body)).save(function(err, result){
        if(err) res.status(500).json(err);
        else res.status(200).json({message: "New sprint created"});
    });
});

router.put('/updateSprint/:id', function(req, res) {
    Sprint.update({_id: req.params.id}, {$set: {'backlogItems': req.body.backlogItems, 'teamStatus': req.body.teamStatus}}, function(err, result){
        if(err) res.status(500).json(err);
        else res.status(200).json({message: "New sprint created"});
    });
});

router.delete('/deleteSprint/:id', function(req, res) {
    Sprint.remove({_id: req.params.id}, function(err, result){
        if(err) res.status(500).json(err);
        else res.status(200).json({message: "Sprint deleted"});
    });
});


module.exports = router;