'use strict';

const { AuthService } = require('../services');
const { ContentNegotiation } = require('../utils');
const { BadRequestError } = require('../errors');

class AuthController {
  constructor() {}

  async register(req, res, next) {
    try {
      const { username, email, password } = await req.body;
      if (!username || !email || !password)
        throw new BadRequestError({
          name: 'Validation Error!',
          description: 'username, email and password are required!',
        });
      const { message, accessToken } = await AuthService.registerUser(
        username,
        email,
        password
      );
      res.cookie('jwt', accessToken, {
        // httpOnly: true,
        secure: true,
        sameSite: 'none',
      });
      return new ContentNegotiation(res, 200, {
        message,
      }).sendResponse();
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { username, password } = await req.body;
      if (!username || !password)
        throw new BadRequestError({
          name: 'Validation Error!',
          description: 'username and password are required!',
        });
      const { message, accessToken } = await AuthService.loginUser(
        username,
        password
      );
      res.cookie('jwt', accessToken, {
        domain: ['localhost'],
        secure: true,
        sameSite: 'none'
      });
      return new ContentNegotiation(res, 200, {
        message,
      }).sendResponse();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();
