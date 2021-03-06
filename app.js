var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var IpInfo = require("ipinfo");
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.enable('trust proxy');
app.set('trust proxy', 'loopback');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(IpInfo);

// set up authentication
require('./modules/authentication/authentication-app')(app);
require('./modules/scrum/scrum-app')(app);
require('./modules/sprint/sprint-app')(app);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/scrum-board', function (err) {
  if (err) console.log('Error: Failed to connect to mongoose!');
  else console.log('Connected to mongodb!');
});

app.use('/', routes);
app.use('/users', users);
app.use('/attendance', require('./modules/attendance/attendance-route'));

app.use('/403', function (req,res,next) {
  var err = new Error('Forbidden');
  err.status = 403;
  next(err);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log('line 61 of app:', err.status);
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.log('line 73 of app:', err);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
