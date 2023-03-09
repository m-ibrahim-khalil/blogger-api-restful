"use strict";

const bcrypt = require ('bcrypt');
var emailValidator = require("email-validator");

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
    if (users.length < 1){
      return {status: 404, message: 'username does not exists!'};
    }
    return {status: 200, message: users.map(user => new ViewOnlyUser(user))};
  }

  async createUser(username, email, password) {
    username = username.toLowerCase();
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
        return { status: 400, message: 'Username can only contain English alphabets and digits'};
    }

    if (!emailValidator.validate(email)){
        return {status:403, message:'Email is not valid'};
    }

    const existingUsername = await UsersRepository.existUsername(username);
    if (existingUsername.rows.length > 0) {
        return {status: 409, message: 'Username already exists'};
    }

    const existingEmail = await UsersRepository.existEmail(email);
    if (existingEmail.rows.length > 0) {
        return {status: 409, message: 'Email already exists'};
    }

    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT));
    const { rows: [createdUser] } = await UsersRepository.create(username, email, hashedPassword);
    return {status: 201, message: new CreateOnlyUser(createdUser)};
  }

  async updateUser(username, password) {
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT));
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