const logger = require('../logger');
const {StatusCodes} = require('../utils');

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong! Please try again later.',
  };
  console.log(err.name);
  switch (err.name){
    case 'SequelizeValidationError':
      customError.msg = "Database Validation Error!";
      customError.statusCode = StatusCodes.BAD_REQUEST;
      break;
    case 'SequelizeDatabaseError':
      customError.msg = "Sequelize Database  Error!";
      customError.statusCode = StatusCodes.BAD_REQUEST;
      break;
    case 'SequelizeUniqueConstraintError':
      customError.statusCode = StatusCodes.BAD_REQUEST;
      customError.msg = err.errors[0].message;
      break;
    default:

  }
  logger.error(
    'Error message from the centralized error-handling component',
    err,
  );
  return res.status(customError.statusCode).send({ message: customError.msg });
};

module.exports = errorHandlerMiddleware;