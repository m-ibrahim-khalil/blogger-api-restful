"use strict";

const Validator = require('../utils/validator');
const {generateHash} = require('../utils/utility');
const { UsersRepository } = require('../ repositories');
const {ViewOnlyUser, CreateOnlyUser} = require('../dto/users')

class UsersService {
  constructor() {}

  async findAllUsers() {
    try{
      const users = await UsersRepository.findAll();
      return  {status: 200, message: users.map(user => new ViewOnlyUser(user))};
    }catch(err){
      return {status: 500, message: `Unhandled error: ${err.name} ---------- ${err.errors[0].message}`};
    }
  }

  async findUser(username) {
    try{
      const users = await UsersRepository.findByUsername(username.toLowerCase());
      if (Validator.checkEmptyArray(users)){
        return {status: 404, message: 'username does not exists!'};
      }
      return {status: 200, message: users.map(user => new ViewOnlyUser(user))};
    }catch(err){
      return {status: 409, message: `Unhandled error: ${err.name} ---------- ${err.errors[0].message}`};
    }
  }

  async createUser(username, email, password) {
    try{
      username = username.toLowerCase();
      const existingUsername = await UsersRepository.existUsername(username);
      if (!Validator.checkEmptyArray(existingUsername)) {
          return {status: 409, message: 'Username already exists'};
      }

      const existingEmail = await UsersRepository.existEmail(email);
      if (!Validator.checkEmptyArray(existingEmail)) {
          return {status: 409, message: 'Email already exists'};
      }
      const hashedPassword = await generateHash(password);
      const createdUser = await UsersRepository.create(username, email, hashedPassword);
      return {status: 201, message: new CreateOnlyUser(createdUser)};
    }catch(err){
      return {status: 409, message: `Unhandled error: ${err.name} ---------- ${err.errors[0].message}`};
    }
  }

  async updateUser(username, password) {
    try{
      const hashedPassword = await generateHash(password);
      const user = await UsersRepository.updateUser(username.toLowerCase(), hashedPassword);
      if (user[0] === 0) {
          return {status: 404, message: 'User not found'};
      }
      return {status: 200, message: 'User updated!'};
    }catch(err){
      return {status: 409, message: `Unhandled error: ${err.name} ---------- ${err.errors[0].message}`};
    }
  }

  async removeUser(Username) {
    try{
      const user = await UsersRepository.removeUser(Username.toLowerCase());
      if (user === 0) {
          return {status: 404, message: 'User not found'};
      }
      return {status: 202, message: 'User removed!'};
    }catch(err){
      return {status: 409, message: `Unhandled error: ${err.name} ---------- ${err.errors[0].message}`};
    }
  }
}

module.exports = new UsersService();