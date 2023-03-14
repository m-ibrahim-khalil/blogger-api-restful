'use strict';
const express = require('express');
const Router = express.Router();

const UsersRouter = require('./users.router');
const AuthRouter = require('./auth.router')
const AuthenticationMiddleware = require('../middleware/authentication.middleware')


Router.use('/users', AuthenticationMiddleware, UsersRouter);
Router.use('/auth', AuthRouter)

/* GET home page. */
Router.all('/', function(req, res, next) {
  res.send("Welcome to home page!");
});

module.exports = Router;