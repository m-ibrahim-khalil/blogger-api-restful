const jwt = require('jsonwebtoken');

const createJWT = (payload) =>
  jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: 'HS256',
    expiresIn: process.env.ACCESS_TOKEN_LIFE,
  });

module.exports = {
  createJWT,
};
