'use strict';

const { generateHashPassword, getPagingData } = require('../utils');
const { UsersRepository } = require('../ repositories');
const { ViewOnlyUser, CreateOnlyUser } = require('../dto/user');
const { HTTP404NotFoundError, BadRequestError } = require('../errors');

class UsersService {
  constructor() {}

  async findAllUsers(limit, offset, page) {
    const data = await UsersRepository.findAll(limit, offset);
    const response = getPagingData(data, page, limit, ViewOnlyUser);
    return { status: 200, message: response };
  }

  async findUser(username) {
    const user = await UsersRepository.findByUsername(username);
    if (!user)
      throw new HTTP404NotFoundError({
        name: 'Not Found',
        description: 'User does not exists!',
      });
    return { status: 200, message: new ViewOnlyUser(user) };
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
  }

  async updateByUsername(username, password) {
    const hashedPassword = await generateHashPassword(password);
    const user = await UsersRepository.updateByUsername(
      username,
      hashedPassword
    );
    if (!user[0])
      throw new HTTP404NotFoundError({
        name: 'Not Found',
        description: 'User does not exists!',
      });
    return { status: 200, message: 'User updated!' };
  }

  async deleteByUsername(Username) {
    const user = await UsersRepository.deleteByUsername(Username);
    if (!user)
      throw new HTTP404NotFoundError({
        name: 'Not Found',
        description: 'User does not exists!',
      });
    return { status: 202, message: 'User removed!' };
  }
}

module.exports = new UsersService();
