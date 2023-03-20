const CustomAPIError = require('./customApi.error');
const UnauthenticatedError = require('./unauthenticated.error');
const NotFoundError = require('./notFound.error');
const BadRequestError = require('./badRequest.error');
const UnauthorizedError = require('./unauthorized.error');
const ConflictError = require('./conflict.error');
const InternalServerError = require('./internalServer.error');
module.exports = {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ConflictError,
  InternalServerError
};
