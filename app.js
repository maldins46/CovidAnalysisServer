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
const cors = require('cors')

require('dotenv').config()

const corsOptions = {
  origin: 'https://maldins46.github.io/CovidAnalysis',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const indexRouter = require('./routes/index');
const subscribeRouter = require('./routes/subscribe');
const unsubscribeRouter = require('./routes/unsubscribe');
const triggerRouter = require('./routes/trigger');
const publickeyRouter = require('./routes/publickey');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: process.env.ENV === 'production' ? 'https://maldins46.github.io' : 'http://localhost:8080',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));

app.use('/', indexRouter);
app.use('/subscribe', subscribeRouter);
app.use('/unsubscribe', unsubscribeRouter);
app.use('/trigger', triggerRouter);
app.use('/publickey', publickeyRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  const errorCode = err.status || 500;
  res.locals.message = process.env.ENV === 'development' ? err.message : `Oh no! Error ${errorCode}!`;
  res.locals.error = process.env.ENV === 'development' ? err : {};

  // render the error page
  res.status(errorCode);
  res.render('error', {
    title: `Error ${errorCode}`,
    message: res.locals.message,
    error: res.locals.error
  });
});

module.exports = app;
