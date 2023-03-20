const StatusCodes = require('../utils/httpStatusCode');
const CustomAPIError = require('./customApi.error');

class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
