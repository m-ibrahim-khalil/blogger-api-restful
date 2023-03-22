const CustomAPIError = require('./customApi.error');
const HTTP404NotFoundError = require('./http404NotFound.error');
const BadRequestError = require('./badRequest.error');
const InternalServerError = require('./internalServer.error');

module.exports = {
  CustomAPIError,
  HTTP404NotFoundError,
  BadRequestError,
  InternalServerError
};