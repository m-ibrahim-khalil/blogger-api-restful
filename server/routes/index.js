'use strict';

const express = require('express');

const Router = express.Router();
const UsersRouter = require('./users.router');
const AuthRouter = require('./auth.router');
const StoriesRouter = require('./stories.router');

Router.use('/users', UsersRouter);
Router.use('/auth', AuthRouter);
Router.use('/stories', StoriesRouter);

/* GET home page. */
Router.all('/', (req, res, next) => {
  res.send('Welcome to home page!');
});

module.exports = Router;
