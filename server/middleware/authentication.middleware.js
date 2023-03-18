'use strict';
const jwt = require('jsonwebtoken');

const authenticationMiddleware = async (req, res, next) => {
  let accessToken = req.cookies.jwt;
  if (!accessToken){
      return res.status(401).send("UnAuthorized user!!");
  }
  try{
    const {username} = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.username = username;
    next();
  }
  catch(err){
      return res.status(401).send("UnAuthorized user!!");
  }
}

module.exports = authenticationMiddleware;