var express = require('express'),
    router = express.Router();

module.exports = function (app){
    app.use('/sprint', require('./sprint-route'));
};