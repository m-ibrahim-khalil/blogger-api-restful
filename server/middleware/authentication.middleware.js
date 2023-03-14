'use strict';
const jwt = require('jsonwebtoken');

const authenticationMiddleware = async (req, res, next) => {
  let accessToken = req.cookies.jwt

  if (!accessToken){
      return res.status(403).send();
  }

  let payload;
  try{
    //use the jwt.verify method to verify the access token
    //throws an error if the token has expired or has a invalid signature
    payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    next();
  }
  catch(err){
      return res.status(401).send()
  }
}

module.exports = authenticationMiddleware;