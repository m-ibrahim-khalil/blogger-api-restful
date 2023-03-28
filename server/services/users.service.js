const { generateHashPassword, getPagingData } = require('../utils');
const { UsersRepository } = require('../ repositories');
const { ViewOnlyUser, CreateOnlyUser } = require('../dto/user');
const { HTTP404NotFoundError, BadRequestError } = require('../errors');

class UsersService {
  async findAllUsers(limit, offset, page) {
    try {
      const data = await UsersRepository.findAll(limit, offset);
      const response = getPagingData(data, page, limit, ViewOnlyUser);
      return { status: 200, message: response };
    } catch (err) {
      throw err;
    }
  }

  async findUser(username, dto = true) {
    try {
      let user = await UsersRepository.findByUsername(username);
      if (!user)
        throw new HTTP404NotFoundError({
          name: 'Not Found',
          description: 'User does not exists!',
        });
      user = dto ? new ViewOnlyUser(user) : user;
      return { status: 200, message: user };
    } catch (err) {
      throw err;
    }
  }

  async createUser(username, email, password) {
    try {
      const existingUsername = await UsersRepository.findByUsername(username);
      if (existingUsername)
        throw new BadRequestError({
          name: 'Conflict',
          description: 'Username already exist!',
        });
      const existingEmail = await UsersRepository.findByEmail(email);
      if (existingEmail)
        throw new BadRequestError({
          name: 'Conflict',
          description: 'Email already exist!',
        });
      const hashedPassword = await generateHashPassword(password);
      const createdUser = await UsersRepository.create(
        username,
        email,
        hashedPassword
      );
      return { status: 201, message: new CreateOnlyUser(createdUser) };
    } catch (err) {
      throw err;
    }
  }

  async updateUserByUsername(username, password) {
    try {
      const hashedPassword = await generateHashPassword(password);
      const user = await UsersRepository.updateUser(username, hashedPassword);
      if (!user[0])
        throw new HTTP404NotFoundError({
          name: 'Not Found',
          description: 'User does not exists!',
        });
      return { status: 200, message: 'User updated!' };
    } catch (err) {
      throw err;
    }
  }

  async deleteUserByUsername(Username) {
    try {
      const user = await UsersRepository.deleteUser(Username);
      if (!user)
        throw new HTTP404NotFoundError({
          name: 'Not Found',
          description: 'User does not exists!',
        });
      return { status: 202, message: 'User removed!' };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new UsersService();
