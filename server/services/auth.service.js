const { createJWT, comparePassword } = require('../utils');
const UserService = require('./users.service');

class AuthService {
  async registerUser(username, email, password) {
    try {
      const { status, message: user } = await UserService.createUser(
        username,
        email,
        password
      );
      if (status.toString().startsWith('4' || '5'))
        return { status, message: user };
      const accessToken = createJWT({ username });
      return { status, message: user, accessToken };
    } catch (err) {
      return { status: 409, message: `Unhandled error: ${err.name}` };
    }
  }

  async loginUser(username, password) {
    try {
      const { status, message: user } = await UserService.findUser(
        username,
        false
      );
      if (status.toString().startsWith('4' || '5'))
        return { status, message: user };
      const hashedPassword = user.password;
      if (!(await comparePassword(password, hashedPassword)))
        return { status: 404, message: 'incorrect password!' };
      const accessToken = createJWT({ username });
      return {
        status: 200,
        message: 'Login Succes!',
        accessToken,
      };
    } catch (err) {
      return { status: 409, message: `Unhandled error: ${err.name}` };
    }
  }
}

module.exports = new AuthService();
