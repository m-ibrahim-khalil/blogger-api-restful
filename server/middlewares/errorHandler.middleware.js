const StatusCodes = require('../utils/httpStatusCode');

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong! Please try again later.',
  };

  if (err.name === 'SequelizeValidationError' || err.name == 'SequelizeDatabaseError')  customError.statusCode = 400;
  if (err.name === 'SequelizeUniqueConstraintError') {
    customError.msg = err.errors[0].message;
    customError.statusCode = 400;
  }

  return res.status(customError.statusCode).json({ message: customError.msg });
};

module.exports = errorHandlerMiddleware;