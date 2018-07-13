const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

require('dotenv').config()

const auth = require('./api/auth');
const auth = require('./api/roles');
const auth = require('./api/permissions');
const users = require('./api/users');

const app = express();

mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/auth', auth);

app.use('/roles', roles);

app.use('/permissions', permissions);

app.use('/users', users);

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
