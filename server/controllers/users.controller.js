"use strict";
const {UsersService} = require('../services');

class UsersController {
  constructor() {}

  async getAllUsers(req, res) {
    const {status, message: users} = await UsersService.findAllUsers();
    return res.status(status).send({message: users});
  }

  async getUserByUsername(req, res) {
    const username = req.params.username;
    if(!username){
      return res.status(400).send({ message: 'Invalid request parameter!' });
    }
    const {status, message: user} = await UsersService.findUser(username);
    return res.status(status).send({message: user});
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
    return res.status(status).send({message: user});
  }

  async deleteUserByUsername(req, res) {
    const username = req.params.username;
    if(!username){
      return res.status(400).send({ message: 'Invalid request parameter!' });
    }
    const {status, message: user} = await UsersService.deleteUserByUsername(username);
    return res.status(status).send({message: user});
  }
}

module.exports = new UsersController();
