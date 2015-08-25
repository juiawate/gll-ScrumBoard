var passport = require('passport'),
    express = require('express'),
    session = require('cookie-session'),
    router = express.Router();

module.exports = function (app){
    app.use(session({ keys: ['secretkey']}));

    app.use(passport.initialize());
    app.use(passport.session());

    var Members = require('./account');
    passport.use(Members.createStrategy());
    passport.serializeUser(Members.serializeUser());
    passport.deserializeUser(Members.deserializeUser());

    app.use('/authenticate', require('./authentication-route'));
};