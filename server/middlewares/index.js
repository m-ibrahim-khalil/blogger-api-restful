const AuthenticationMiddleware = require('./authentication.middleware');
const {
  StoryAuthorizationMiddleware,
  UserAuthorizationMiddleware,
} = require('./authorization.middleware');
const InvalidRoutesMiddleware = require('./invalidRoutes.middleware');
const ErrorHandlerMiddleware = require('./errorHandler.middleware');

module.exports = {
  AuthenticationMiddleware,
  StoryAuthorizationMiddleware,
  UserAuthorizationMiddleware,
  ErrorHandlerMiddleware,
  InvalidRoutesMiddleware,
};
