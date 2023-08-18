'use strict';

const jwt = require('jsonwebtoken');
const { BadRequestError } = require('../errors');
const { StatusCodes } = require('../utils');
const { environment } = require('../configs/environment.config');

const authenticationMiddleware = async (req, res, next) => {
  try {
    const accessToken = req.cookies.jwt;
    if (!accessToken)
      throw new BadRequestError({
        name: 'Authentication Failed!',
        statusCode: StatusCodes.BAD_REQUEST,
        description: 'UnAuthorized user!',
      });
    const { username } = jwt.verify(
      accessToken,
      environment.JWT_ACCESS_TOKEN_SECRET
    );
    req.username = username;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authenticationMiddleware;
