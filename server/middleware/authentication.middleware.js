'use strict';
const jwt = require('jsonwebtoken');

const authenticationMiddleware = async (req, res, next) => {
  const accessToken = req.cookies.jwt

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













// const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     throw new Error('No token provided');
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const { id, username } = decoded;
//     req.user = { id, username };
//     next();
//   } catch (error) {
//     throw new Error('Not authorized to access this route');
//   }