const StatusCodes = require('../utils/httpStatusCode');
const CustomAPIError = require('./customApi.error');

class UnauthorizedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
module.exports = UnauthorizedError;
