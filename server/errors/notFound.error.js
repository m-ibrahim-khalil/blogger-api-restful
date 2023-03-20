const StatusCodes = require('../utils/httpStatusCode');
const CustomAPIError = require('./customApi.error');

class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
