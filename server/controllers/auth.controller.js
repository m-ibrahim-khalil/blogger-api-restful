const { AuthService } = require('../services');
const { BadRequestError } = require('../errors');
const { ContentNegotiation } = require('../utils');

class AuthController {
  async register(req, res, next) {
    try {
      const { Username, Email, Password } = await req.body;
      if (!Username || !Email || !Password)
        throw new BadRequestError({
          name: 'Validation Error!',
          description: 'Username, Email and Password are required!',
        });
      const { status, message, accessToken } = await AuthService.registerUser(
        Username,
        Email,
        Password
      );
      res.cookie('jwt', accessToken, { httpOnly: true });
      return new ContentNegotiation(res, status, {
        message,
      }).sendResponse();
    } catch (err) {
      return next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { Username, Password } = await req.body;
      if (!Username || !Password)
        throw new BadRequestError({
          name: 'Validation Error!',
          description: 'Username and Password are required!',
        });
      const { status, message, accessToken } = await AuthService.loginUser(
        Username,
        Password
      );
      res.cookie('jwt', accessToken, { httpOnly: true });
      return new ContentNegotiation(res, status, {
        message,
      }).sendResponse();
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new AuthController();
