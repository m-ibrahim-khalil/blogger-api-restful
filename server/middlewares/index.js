'use strict';
const AuthenticationMiddleware = require('./authentication.middleware');
const {StoryAuthorizationMiddleware, UserAuthorizationMiddleware} = require('./authorization.middleware');
const InvalidRoutesMiddleware = require('./invalidRoutes.middleware');

module.exports = {
  AuthenticationMiddleware,
  StoryAuthorizationMiddleware,
  UserAuthorizationMiddleware,
  InvalidRoutesMiddleware
};