const {StatusCodes} = require('../utils');
const CustomAPIError = require('./customApi.error');

class BadRequestError extends CustomAPIError {
  constructor({name, statusCode = StatusCodes.BAD_REQUEST, isOperational = false, description = 'Client Side Error!'}) {
    super(name, statusCode, isOperational, description);
  }
}
module.exports = BadRequestError;
