'use strict';

const AuthenticationMiddleware = require('./authentication.middleware');
const {
  StoryAuthorizationMiddleware,
  UserAuthorizationMiddleware,
} = require('./authorization.middleware');
const InvalidRoutesMiddleware = require('./invalidRoutes.middleware');
const ErrorHandlerMiddleware = require('./errorHandler.middleware');
const {uploadImage, upload} = require('./fileUpload.middleware');

module.exports = {
  AuthenticationMiddleware,
  StoryAuthorizationMiddleware,
  UserAuthorizationMiddleware,
  ErrorHandlerMiddleware,
  InvalidRoutesMiddleware,
  uploadImage,
  upload
};
