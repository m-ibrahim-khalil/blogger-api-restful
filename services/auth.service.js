const { createJWT, comparePassword, StatusCodes } = require('../utils');
const UserService = require('./users.service');
const { BadRequestError } = require('../errors');

class AuthService {
  async registerUser(username, email, password) {
    const { message } = await UserService.createUser(
      username,
      email,
      password
    );
    username = username.toLowerCase();
    const accessToken = createJWT({ username });
    return { message, accessToken };
  }

  async loginUser(username, password) {
    const { password: hashedPassword } = await UserService.findUserPassword(
      username
    );
    if (!(await comparePassword(password, hashedPassword))) {
      throw new BadRequestError({
        name: 'Authentication Failed!',
        statusCode: StatusCodes.UNAUTHORIZED,
        description: 'Incorrect password!',
      });
    }
    username = username.toLowerCase();
    const accessToken = createJWT({ username });
    return {
      message: 'Login Succes!',
      accessToken,
    };
  }
}

module.exports = new AuthService();
