var express = require('express'),
	path = require('path'),
	favicon = require('serve-favicon'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	socket_io = require('socket.io'), 
	glob = require('glob');

var app = express();

var io = socket_io();
app.io = io;

io.sockets.on("connection",function(socket){
  console.log("Socket Connected!");
});

//import and define all the routes
require('./src/modules/routes')(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'src/assets/images/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'src/')));
app.use(express.static(path.join(__dirname, 'src/assets')));
app.use(express.static(path.join(__dirname, 'src/modules')));
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

  // render the error page and message
  res.status(err.status || 500);
  res.render('error', {
  	message:err.message,
  	error: err
  });
});

module.exports = app;
