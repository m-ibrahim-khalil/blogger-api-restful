'use strict';

const { generateHashPassword, getPagingData, comparePassword, StatusCodes } = require('../utils');
const { UsersRepository } = require('../ repositories');
const { ViewOnlyUser, CreateOnlyUser } = require('../dto/user');
const { HTTP404NotFoundError, BadRequestError } = require('../errors');

class UsersService {
  constructor() {}

  async findAllUsers(limit, offset, page) {
    const users = await UsersRepository.findAll(limit, offset);
    const response = getPagingData(users, page, limit, ViewOnlyUser);
    return { message: response };
  }

  async findUser(username) {
    const user = await UsersRepository.findByUsername(username);
    if (!user)
      throw new HTTP404NotFoundError({
        name: 'Not Found',
        description: 'User does not exists!',
      });
    return { message: new ViewOnlyUser(user) };
  }

  async findUserPassword(username) {
    const user = await UsersRepository.findByUsername(username);
    if (!user)
      throw new HTTP404NotFoundError({
        name: 'Not Found',
        description: 'User does not exists!',
      });
    return { password: user.password };
  }

  async createUser(username, email, password) {
    const existingUsername = await UsersRepository.findByUsername(username);
    if (existingUsername)
      throw new BadRequestError({
        name: 'Conflict',
        description: 'username already exist!',
      });
    const existingEmail = await UsersRepository.findByEmail(email);
    if (existingEmail)
      throw new BadRequestError({
        name: 'Conflict',
        description: 'email already exist!',
      });
    const hashedPassword = await generateHashPassword(password);
    const createdUser = await UsersRepository.create(
      username,
      email,
      hashedPassword
    );
    return { message: new CreateOnlyUser(createdUser) };
  }

  async updateByUsername(username, oldPassword, newPassword) {
    const {password: userPassword} = await this.findUserPassword(username);
    console.log(oldPassword, userPassword)

    if (!(await comparePassword(oldPassword, userPassword))) {
      throw new BadRequestError({
        name: 'Authentication Failed!',
        statusCode: StatusCodes.UNAUTHORIZED,
        description: 'Incorrect old password! You need to provide correct old password to update new password.',
      });
    }

    const hashedNewPassword = await generateHashPassword(newPassword);
    const user = await UsersRepository.updateByUsername(
      username,
      hashedNewPassword
    );
    if (!user[0])
      throw new HTTP404NotFoundError({
        name: 'Database error',
        description: 'Update password failed!',
      });
    return { message: 'Password updated!' };
  }

  async deleteByUsername(username) {
    const user = await UsersRepository.deleteByUsername(username);
    if (!user)
      throw new HTTP404NotFoundError({
        name: 'Not Found',
        description: 'User does not exists!',
      });
    return { message: 'User removed!' };
  }
}

module.exports = new UsersService();
