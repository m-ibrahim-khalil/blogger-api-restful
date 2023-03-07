"use strict";

const bcrypt = require ('bcrypt');
const { UsersRepository } = require('../ repositories');

class UsersService {
  constructor() {}

  async findAllUsers() {
    return await UsersRepository.findAll();
  }

  async findUser(Username) {
    return await UsersRepository.findOne(Username.toLowerCase());
  }

  async createUser(username, email, password) {
    username = username.toLowerCase();
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
        return { status: 400, message: 'Username can only contain English alphabets and digits'};
    }

    const existingUsername = await UsersRepository.existUsername(username);
    if (existingUsername.rows.length > 0) {
        return {status: 409, message: 'Username already exists'};
    }

    const existingEmail = await UsersRepository.existEmail(email);
    if (existingEmail.rows.length > 0) {
        return {status: 409, message: 'Email already exists'};
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows: [createdUser] } = await UsersRepository.create(username, email, hashedPassword);
    return {status: 201, message: createdUser};
  }

  async updateUser(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10)
    const {rowCount} = await UsersRepository.updateUser(username.toLowerCase(), hashedPassword)
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