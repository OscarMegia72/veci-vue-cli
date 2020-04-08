'use strict'
const dotenv = require('dotenv')
dotenv.config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const moment = require('moment')
const adaro = require('adaro');
// Routes
const index = require('./routes/veci');
// Define app
const app = express();
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.engine('dust', adaro.dust());
app.set('view engine', 'dust');
//------------
app.use(express.json({ limit: '2mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// routing
app.use('/', index);
app.use(cookieParser());
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});
app.use(function(req, res, next) {
    console.log("query: " + req.query)
    next()
});

module.exports = app;