const {StatusCodes} = require('../utils');
const CustomAPIError = require('./customApi.error');

class InternalServerError extends CustomAPIError {
  constructor({name, statusCode = StatusCodes.INTERNAL_SERVER_ERROR, isOperational = true, description = 'internal server error'}) {
    super(name, statusCode, isOperational, description);
  }
}
module.exports = InternalServerError;
