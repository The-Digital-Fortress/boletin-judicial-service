var cors = require('cors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var v1indexRouter = require('./routes/v1routes');
var v2indexRouter = require('./routes/v2routes');

var app = express();

app.use(cors()); 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/v1', v1indexRouter);
app.use('/v2', v2indexRouter);

module.exports = app;
