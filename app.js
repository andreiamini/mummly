var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var twilio = require('twilio');
var accountSid = 'AC46622e5dff1a1661a80f5bd6c507d6e5';
var authToken = '8d535f57a48684cc14c48747e7b28895';

var routes = require('./routes/index');
var users = require('./routes/users');

var client = require('twilio')(accountSid, authToken);
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.post('/', function(req, res) {

  module.exports.number = req.body.number;

  var number = req.body.number;
  console.log(number);

  var client = require('twilio')('AC46622e5dff1a1661a80f5bd6c507d6e5', '2b50f65e96f4defc2743794e905c4d64');

  client.sendSms({
      to: req.body.number,
      from:'441721272014',
      body: "Liza wants to say Happy Mother's Day! <3"
  }, function(error, message) {
      if (!error) {
          console.log('Success! The SID for this SMS message is:');
          console.log(message.sid);
          console.log('Message sent on:');
          console.log(message.dateCreated);
      } else {
          console.log('Oops! There was an error.');
      }
  });


  client.calls.create({
    url: "http://twimlbin.com/b8fd3d6e/xml",
    to: req.body.number,
    from: "441721272014"
  }, function(error, call) {
      if(!error) {
        console.log('Calling...')
      } else {
        console.log('Error while calling');;
      }
  });


  res.render('messagesent', {
      number: req.body.number,
  });
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
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var myname = "Liza"
exports.myname = myname;
console.log("sup");

module.exports = app;
module.exports.myname = myname;
