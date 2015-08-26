var express = require('express'),
    router = express.Router(),
    Scrum = require('./scrum');

router.get('/', function(req, res) {
    res.render('scrum',{});
});

router.get('/getItems/:id', function(req, res) {
    Scrum.find({_id: req.params.id}, function (err, result) {
        if(err) res.status(500).json(err);
        else res.status(200).json(result);
    });
});

router.post('/addItem', function(req, res) {
    (new Scrum(req.body)).save(function(err, result){
        if(err) res.status(500).json(err);
        else res.status(200).json({message: "Backlog item added in scrum"});
    });
});

module.exports = router;