var passport = require('passport'),
    express = require('express'),
    session = require('cookie-session'),
    router = express.Router();

module.exports = function (app){
    app.use('/', require('./attendance-route'));
};