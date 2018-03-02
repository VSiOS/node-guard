var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var config = require('./utilities/config');
var index = require('./routes/v1/index');
var admin = require('./routes/v1/admin/admin');
var users = require('./routes/v1/users');
var roles = require('./routes/v1/roles');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


/********* MONGO DATABASE CONNECTIVITY************* */
//Import the mongoose module
var mongoose = require('mongoose');
//Set up default mongoose connection
var mongoDB = config.DB_URL;
var options = {
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections, default is 5, increased to 10 so that slow queries dont block faster ones
  bufferMaxEntries: 0,
  
  
};

mongoose.connect(mongoDB,options);

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

// CONNECTION EVENTS
// When successfully connected
db.on('connected', function () {  
  console.log('Mongoose default connection open to ' );
}); 

// If the connection throws an error
db.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
db.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  db.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 
/************************************************** */

/********************APP LEVEL MIDDLEWARE********** */

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//authentication middleware 
app.use(function (req, res, next) {
  console.log('Time:', Date.now())
  //TODO: Check if user is authorized 
  next()
})

//chck for content type
app.use(function (req, res, next) {

  var contentType = req.headers['content-type'];
  if(contentType === 'application/json'){
    next();
  }
  else{
    res.status(400).json({message:"bad request"});
    return;
  }
})
/************************************************** */







/*******************VERSION:1 ROUTES*************** */
app.use('/v1', index);
app.use('/v1/admin/admin', admin);

app.use('/v1/users', users);
app.use('/v1/roles', roles);




/************************************************ */



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
