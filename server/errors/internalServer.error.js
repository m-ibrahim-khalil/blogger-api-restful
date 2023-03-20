const StatusCodes = require('../utils/httpStatusCode');
const CustomAPIError = require('./customApi.error');

class InternalServerError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}
module.exports = InternalServerError;
