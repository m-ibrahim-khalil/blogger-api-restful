const { StatusCodes } = require('../utils');
const CustomAPIError = require('./customApi.error');

class HTTP404NotFoundError extends CustomAPIError {
  constructor({
    name,
    statusCode = StatusCodes.NOT_FOUND,
    isOperational = false,
    description = 'Requested resource not found!',
  }) {
    super(name, statusCode, isOperational, description);
  }
}

module.exports = HTTP404NotFoundError;
