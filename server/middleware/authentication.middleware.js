'use strict';
const jwt = require('jsonwebtoken');

const authenticationMiddleware = async (req, res, next) => {
  let accessToken = req.cookies.jwt;

  if (!accessToken){
      return res.status(403).send();
  }

  try{
    //use the jwt.verify method to verify the access token
    //throws an error if the token has expired or has a invalid signature
    const {username} = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.username = username;
    next();
  }
  catch(err){
      return res.status(401).send("Protected resources! UnAuthorized user!!")
  }
}

module.exports = authenticationMiddleware;