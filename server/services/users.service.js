"use strict";

const Validator = require('../utils/validator');
const {generateHash} = require('../utils/utility');
const { UsersRepository } = require('../ repositories');
const {ViewOnlyUser, CreateOnlyUser} = require('../dto/users')

class UsersService {
  constructor() {}

  async findAllUsers() {
    const { rows: users } = await UsersRepository.findAll();
    return  {status: 200, message:users.map(user => new ViewOnlyUser(user))};
  }

  async findUser(username) {  
    const { rows: users } = await UsersRepository.findByUsername(username.toLowerCase());
    if (Validator.checkEmptyArray(users)){
      return {status: 404, message: 'username does not exists!'};
    }
    return {status: 200, message: users.map(user => new ViewOnlyUser(user))};
  }

  async createUser(username, email, password) {
    username = username.toLowerCase();
    if (!Validator.validateUsename(username)) {
        return { status: 400, message: 'Username can only contain English alphabets and digits'};
    }

    if (!Validator.validateEmail(email)){
        return {status:400, message:'Email is not valid'};
    }

    const { rows: existingUsername } = await UsersRepository.existUsername(username);
    if (!Validator.checkEmptyArray(existingUsername)) {
        return {status: 409, message: 'Username already exists'};
    }

    const { rows: existingEmail }  = await UsersRepository.existEmail(email);
    if (!Validator.checkEmptyArray(existingEmail)) {
        return {status: 409, message: 'Email already exists'};
    }
    const hashedPassword = await generateHash(password);
    const { rows: [createdUser] } = await UsersRepository.create(username, email, hashedPassword);
    return {status: 201, message: new CreateOnlyUser(createdUser)};
  }

  async updateUser(username, password) {
    const hashedPassword = await generateHash(password);
    const {rowCount} = await UsersRepository.updateUser(username.toLowerCase(), hashedPassword);
    if (rowCount === 0) {
        return {status: 404, message: 'User not found'};
    }
    return {status: 200, message: 'User updated!'};
  }

  async removeUser(Username) {
    const {rowCount} = await UsersRepository.removeUser(Username.toLowerCase());
    if (rowCount === 0) {
        return {status: 404, message: 'User not found'};
    }
    return {status: 202, message: 'User removed!'};
  }
}

module.exports = new UsersService();