'use strict';
const jwt = require('jsonwebtoken');
const {BadRequestError} = require('../errors');

const authenticationMiddleware = async (req, res, next) => {
  try{
    let accessToken = req.cookies.jwt;
    if (!accessToken) throw new BadRequestError({name: "Authentication Failed!", statusCode: 401, description: "UnAuthorized user!"});
    const {username} = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.username = username;
    next();
  }
  catch(err){
    throw err;
  }
}

module.exports = authenticationMiddleware;