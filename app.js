/*
 * Copyright (c) 2021 Riccardo Maldini.
 *
 * This file is part of the CovidAnalysis project, and is distributed under the terms of
 * the MIT License, as described in the file LICENSE in the repository's top directory.
 *
 */

const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
require('dotenv').config()

const indexRouter = require('./routes/index');
const subscribeRouter = require('./routes/subscribe');
const triggerRouter = require('./routes/trigger');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/subscribe', subscribeRouter);
app.use('/trigger', triggerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = process.env.ENV === 'development' ? err.message : "Oh no! An error occurred!";
  res.locals.error = process.env.ENV === 'development' ? err : {};
  errorCode = err.status || 500;

  // render the error page
  res.status(errorCode);
  res.render('error', {
    title: `Error ${errorCode}`,
    message: res.locals.message,
    error: res.locals.error
  });
});

module.exports = app;
