'use strict';
const express = require('express');
const Router = express.Router();

const UsersRouter = require('./users.router');


Router.use('/users', UsersRouter);

/* GET home page. */
Router.all('/', function(req, res, next) {
  res.send("Welcome to home page!");
});

module.exports = Router;