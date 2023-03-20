'use strict';
const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors');

const authenticationMiddleware = async (req, res, next) => {
  let accessToken = req.cookies.jwt;
  if (!accessToken) throw new CustomAPIError.UnauthenticatedError("UnAuthorized user!!");
  try{
    const {username} = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.username = username;
    next();
  }
  catch(err){
    throw new CustomAPIError.UnauthenticatedError("UnAuthorized user!!");
  }
}

module.exports = authenticationMiddleware;