const StatusCodes = require('../utils/httpStatusCode');
const CustomAPIError = require('./customApi.error');

class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;
