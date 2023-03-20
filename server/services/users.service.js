"use strict";
const {generateHashPassword} = require('../utils');
const { UsersRepository } = require('../ repositories');
const {ViewOnlyUser, CreateOnlyUser} = require('../dto/user');
const CustomAPIError = require('../errors');

class UsersService {
  constructor() {}

  async findAllUsers() {
    try{
      const users = await UsersRepository.findAll();
      return  {status: 200, message: users.map(user => new ViewOnlyUser(user))};
    }catch(err){
      throw new CustomAPIError.InternalServerError(err);
    }
  }

  async findUser(username, dto=true) {
    try{
      let user = await UsersRepository.findByUsername(username);
      if (!user) throw new CustomAPIError.NotFoundError('User not found!');
      user = dto ? new ViewOnlyUser(user) : user;
      return {status: 200, message: user};
    }catch(err){
      throw new CustomAPIError.InternalServerError(err);
    }
  }

  async createUser(username, email, password) {
    try{
      const existingUsername = await UsersRepository.findByUsername(username);
      if (existingUsername) throw new CustomAPIError.ConflictError("Username already exist!");
      const existingEmail = await UsersRepository.findByEmail(email);
      if (existingEmail) throw new CustomAPIError.ConflictError("Email already exist!");
      const hashedPassword = await generateHashPassword(password);
      const createdUser = await UsersRepository.create(username, email, hashedPassword);
      return {status: 201, message: new CreateOnlyUser(createdUser)};
    }catch(err){
      throw new CustomAPIError.InternalServerError(err);
    }
  }

  async updateUserByUsername(username, password) {
    try{
      const hashedPassword = await generateHashPassword(password);
      const user = await UsersRepository.updateUser(username, hashedPassword);
      if (!user[0]) throw new CustomAPIError.NotFoundError('User not found!');
      return {status: 200, message: 'User updated!'};
    }catch(err){
      throw new CustomAPIError.InternalServerError(err);
    }
  }

  async deleteUserByUsername(Username) {
    try{
      const user = await UsersRepository.deleteUser(Username);
      if (!user) throw new CustomAPIError.NotFoundError('User not found!');
      return {status: 202, message: 'User removed!'};
    }catch(err){
      throw new CustomAPIError.InternalServerError(err);
    }
  }
}

module.exports = new UsersService();