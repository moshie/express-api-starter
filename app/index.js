const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

require('dotenv').config()

const app = express();

mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function (req, res, next) {

    var contentType = req.get('Content-Type');
    if (!contentType && contentType.indexOf('application/vnd.api+json') !== -1) {
        return res.status(415).json({
            errors: [{
                status: '415',
                title: 'Invalid Content Type',
                detail: 'Content Type must not include the "application/vnd.api+json" or any media types'
            }]
        });
    }

    res.set('Content-Type', 'application/vnd.api+json');

    next();
});

app.use('/api/v1/auth', require('./api/auth'));
app.use('/api/v1/roles', require('./api/roles'));
app.use('/api/v1/permissions', require('./api/permissions'));
app.use('/api/v1/users', require('./api/users'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({
    data: { message: 'error' }
  });
});

module.exports = app;
