const { createJWT, comparePassword, StatusCodes } = require('../utils');
const UserService = require('./users.service');
const { BadRequestError } = require('../errors');

class AuthService {
  async registerUser(username, email, password) {
    try {
      const { status, message: user } = await UserService.createUser(
        username,
        email,
        password
      );
      const accessToken = createJWT({ username });
      return { status, message: user, accessToken };
    } catch (err) {
      throw err;
    }
  }

  async loginUser(username, password) {
    try {
      const { password: hashedPassword } = await UserService.findUserPassword(username);
      if (!(await comparePassword(password, hashedPassword))) {
        throw new BadRequestError({
          name: 'Authentication Failed!',
          statusCode: StatusCodes.UNAUTHORIZED,
          description: 'Incorrect password!',
        });
      }
      const accessToken = createJWT({ username });
      return {
        status: 200,
        message: 'Login Succes!',
        accessToken,
      };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new AuthService();
