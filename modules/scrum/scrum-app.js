var express = require('express'),
    router = express.Router();

module.exports = function (app){
    app.use('/scrum', require('./scrum-route'));
};