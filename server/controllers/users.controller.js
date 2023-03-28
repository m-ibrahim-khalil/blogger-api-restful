"use strict";
const {UsersService} = require('../services');
const {ContentNegotiation, getPagination} = require('../utils');

class UsersController {
  constructor() {}

  async getAllUsers(req, res) {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    const {status, message: users} = await UsersService.findAllUsers(limit, offset, page);
    return new ContentNegotiation(res, status, {message: users}).sendResponse();
  }

  async getUserByUsername(req, res) {
    const username = req.params.username;
    if(!username){
      return res.status(400).send({ message: 'Invalid request parameter!' });
    }
    const {status, message: user} = await UsersService.findUser(username);
    return new ContentNegotiation(res, status, {message: user}).sendResponse();
  }

  async updateUserByUsername(req, res) {
    const username = req.params.username;
    if(!username){
      return res.status(400).send({ message: 'Invalid request parameter!' });
    }
    const { Password }  = req.body;
    if (!Password) {
      return res.status(400).send({ message: 'Invalid request body' });
    }
    const {status, message: user} = await UsersService.updateUserByUsername(username, Password);
    return new ContentNegotiation(res, status, {message: user}).sendResponse();
  }

  async deleteUserByUsername(req, res) {
    const username = req.params.username;
    if(!username){
      return res.status(400).send({ message: 'Invalid request parameter!' });
    }
    const {status, message: user} = await UsersService.deleteUserByUsername(username);
    return new ContentNegotiation(res, status, {message: user}).sendResponse();;
  }
}

module.exports = new UsersController();
