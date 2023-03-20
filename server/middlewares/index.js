'use strict';
const AuthenticationMiddleware = require('./authentication.middleware');
const AuthorizationMiddleware = require('./authorization.middleware');
const InvalidRoutesMiddleware = require('./invalidRoutes.middleware');

module.exports = {
  AuthenticationMiddleware,
  AuthorizationMiddleware,
  InvalidRoutesMiddleware
};