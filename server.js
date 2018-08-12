const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const app = express();
const server = http.Server(app);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/nytreact';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'app/build')));
} else {
  app.use(express.static(path.join(__dirname, 'app/public')));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', apiRouter(server));
app.use('*', indexRouter);

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

module.exports = { app, server };
