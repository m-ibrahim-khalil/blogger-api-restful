const jwt = require('jsonwebtoken');
const { environment } = require('../configs/environment.config');

const createJWT = (payload) =>
  jwt.sign(payload, environment.JWT_ACCESS_TOKEN_SECRET, {
    algorithm: 'HS256',
    expiresIn: environment.JWT_ACCESS_TOKEN_LIFE,
  });

module.exports = {
  createJWT,
};
