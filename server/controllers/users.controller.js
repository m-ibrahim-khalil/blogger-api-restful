"use strict";

const UsersService = require('../services/users.service');

class UsersController {
  constructor() {}

  async getAllUsers(req, res) {
    const data = await UsersService.findAllUsers();
    return res.status(200).send(data.rows);
  }

  async getUserById(req, res) {
    const id = req.params.id;
    const data = await UsersService.findUser(id);
    if (data.rows.length < 1){
      return res.status(404).send("User not found!");
    }
    return res.status(200).send(data.rows);
  }

  async createUser(req, res) {
    const {Username, Email, Password} = await req.body;
    if (!Username || !Email || !Password) {
      return res.status(400).send({ message: 'Invalid request body' });
    }
    const data = await UsersService.createUser(Username, Email, Password);
    if (data) return res.status(data.status).send(data.message);
  }

  async deleteUserById(req, res) {
    const id = req.params.id;
    const data = await UsersService.removeUser(id);
    return res.status(data.status).send(data.message);
  }

  async updateUserById(req, res) {
    const id = req.params.id;
    const { Password }  = req.body;
    if (!Password) {
      res.status(400).send({ message: 'Invalid request body' });
      return;
    }
    const data = await UsersService.updateUser(id, Password);
    return res.status(data.status).send({ message:  data.message});
  }
}

module.exports = new UsersController();
