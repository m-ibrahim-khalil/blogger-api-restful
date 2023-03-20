const StatusCodes = require('../utils/httpStatusCode');
const CustomAPIError = require('./customApi.error');

class ConflictError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.CONFLICT;
  }
}

module.exports = ConflictError;
