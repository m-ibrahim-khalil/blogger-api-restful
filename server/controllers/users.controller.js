"use strict";
const UsersService = require('../services/users.service');

class UsersController {
  constructor() {}

  async getAllUsers(req, res) {
    const data = await UsersService.findAllUsers();
    return res.status(data.status).send(data.message);
  }

  async getUserByUsername(req, res) {
    const username = req.params.username;
    if(!username){
      return res.status(400).send({ message: 'Invalid request parameter!' });
    }
    const data = await UsersService.findUser(username);
    return res.status(data.status).send(data.message);
  }

  async deleteUserByUsername(req, res) {
    const username = req.params.username;
    if(!username){
      return res.status(400).send({ message: 'Invalid request parameter!' });
    }
    const data = await UsersService.removeUser(username);
    return res.status(data.status).send(data.message);
  }

  async updateUserByUsername(req, res) {
    const username = req.params.username;
    if(!username){
      return res.status(400).send({ message: 'Invalid request parameter!' });
    }
    const { Password }  = req.body;
    if (!Password) {
      res.status(400).send({ message: 'Invalid request body' });
      return;
    }
    const data = await UsersService.updateUser(username, Password);
    return res.status(data.status).send({ message:  data.message});
  }
}

module.exports = new UsersController();
