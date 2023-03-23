const { generateHashPassword, getPagingData } = require('../utils');
const { UsersRepository } = require('../ repositories');
const { ViewOnlyUser, CreateOnlyUser } = require('../dto/user');

class UsersService {
  async findAllUsers(limit, offset, page) {
    try {
      const data = await UsersRepository.findAll(limit, offset);
      const response = getPagingData(data, page, limit, ViewOnlyUser);
      return { status: 200, message: response };
    } catch (err) {
      return { status: 500, message: `Unhandled error: ${err.name}` };
    }
  }

  async findUser(username, dto = true) {
    try {
      let user = await UsersRepository.findByUsername(username);
      if (!user) {
        return { status: 404, message: 'username does not exists!' };
      }
      user = dto ? new ViewOnlyUser(user) : user;
      return { status: 200, message: user };
    } catch (err) {
      return { status: 500, message: `Unhandled error: ${err.name}` };
    }
  }

  async createUser(username, email, password) {
    try {
      const existingUsername = await UsersRepository.findByUsername(username);
      if (existingUsername) {
        return { status: 409, message: 'Username already exists' };
      }

      const existingEmail = await UsersRepository.findByEmail(email);
      if (existingEmail) {
        return { status: 409, message: 'Email already exists' };
      }
      const hashedPassword = await generateHashPassword(password);
      const createdUser = await UsersRepository.create(
        username,
        email,
        hashedPassword
      );
      return { status: 201, message: new CreateOnlyUser(createdUser) };
    } catch (err) {
      return { status: 500, message: `Unhandled error: ${err.name}` };
    }
  }

  async updateUserByUsername(username, password) {
    try {
      const hashedPassword = await generateHashPassword(password);
      const user = await UsersRepository.updateUser(username, hashedPassword);
      if (!user[0]) {
        return { status: 404, message: 'User not found' };
      }
      return { status: 200, message: 'User updated!' };
    } catch (err) {
      return { status: 500, message: `Unhandled error: ${err.name}` };
    }
  }

  async deleteUserByUsername(Username) {
    try {
      const user = await UsersRepository.deleteUser(Username);
      if (!user) {
        return { status: 404, message: 'User not found' };
      }
      return { status: 202, message: 'User removed!' };
    } catch (err) {
      return { status: 500, message: `Unhandled error: ${err.name}` };
    }
  }
}

module.exports = new UsersService();
