var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var subscribeRouter = require('./routes/subscribe');
var triggerCovidRouter = require('./routes/trigger-covid');
var triggerVaccinesRouter = require('./routes/trigger-vaccines');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/subscribe', subscribeRouter);
app.use('/trigger-covid', triggerCovidRouter);
app.use('/trigger-vaccines', triggerVaccinesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  errorCode = err.status || 500;

  // render the error page
  res.status(errorCode);
  res.render('error', { title: `Error ${errorCode}`, message: res.locals.message, error: res.locals.error });
});

module.exports = app;
