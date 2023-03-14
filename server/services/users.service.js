"use strict";
const {generateHashPassword, validator} = require('../utils');
const { UsersRepository } = require('../ repositories');
const {ViewOnlyUser, CreateOnlyUser} = require('../dto/users')

class UsersService {
  constructor() {}

  async findAllUsers() {
    try{
      const users = await UsersRepository.findAll();
      return  {status: 200, message: users.map(user => new ViewOnlyUser(user))};
    }catch(err){
      return {status: 500, message: `Unhandled error: ${err.name}`};
    }
  }

  async findUser(username) {
    try{
      const users = await UsersRepository.findByUsername(username);
      if (validator.checkEmptyArray(users)){
        return {status: 404, message: 'username does not exists!'};
      }
      return {status: 200, message: users.map(user => new ViewOnlyUser(user))};
    }catch(err){
      return {status: 409, message: `Unhandled error: ${err.name}`};
    }
  }

  async createUser(username, email, password) {
    try{
      const existingUsernames = await UsersRepository.findByUsername(username);
      if (!validator.checkEmptyArray(existingUsernames)) {
          return {status: 409, message: 'Username already exists'};
      }

      const existingEmails = await UsersRepository.findByEmail(email);
      if (!validator.checkEmptyArray(existingEmails)) {
          return {status: 409, message: 'Email already exists'};
      }
      const hashedPassword = await generateHashPassword(password);
      const createdUser = await UsersRepository.create(username, email, hashedPassword);
      return {status: 201, message: new CreateOnlyUser(createdUser)};
    }catch(err){
      return {status: 409, message: `Unhandled error: ${err.name}`};
    }
  }

  async updateUser(username, password) {
    try{
      const hashedPassword = await generateHashPassword(password);
      const user = await UsersRepository.updateUser(username, hashedPassword);
      if (user[0] === 0) {
          return {status: 404, message: 'User not found'};
      }
      return {status: 200, message: 'User updated!'};
    }catch(err){
      return {status: 409, message: `Unhandled error: ${err.name}`};
    }
  }

  async removeUser(Username) {
    try{
      const user = await UsersRepository.removeUser(Username);
      if (user === 0) {
          return {status: 404, message: 'User not found'};
      }
      return {status: 202, message: 'User removed!'};
    }catch(err){
      return {status: 409, message: `Unhandled error: ${err.name}`};
    }
  }

  async __getPassword(username){
    try{
      const users = await UsersRepository.findByUsername(username);
      if (validator.checkEmptyArray(users)){
        return {status: 404, message: 'username does not exists!'};
      }
      return {status: 200, password: users[0].password};
    }catch(err){
      return {status: 409, message: `Unhandled error: ${err.name}`};
    }
  }
}

module.exports = new UsersService();