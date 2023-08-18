const { StatusCodes } = require('../utils');
const CustomAPIError = require('./customApi.error');

class ForbiddenError extends CustomAPIError {
  constructor({
    name,
    statusCode = StatusCodes.FORBIDDEN,
    isOperational = false,
    description = 'Not Allowed!',
  }) {
    super(name, statusCode, isOperational, description);
  }
}
module.exports = ForbiddenError;
