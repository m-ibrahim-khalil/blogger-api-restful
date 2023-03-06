"use strict";

const { UsersRepository } = require('../ repositories');

class UsersController {
  constructor() {}

  async getAllUsers(req, res) {
    const data = await UsersRepository.findAll();
    return res.status(200).send(data.rows);
  }

  async getUserById(req, res) {
    const id = req.params.id;
    const data = await UsersRepository.findById(id);
    return res.status(200).send(data.rows);
  }

  async createUser(req, res) {
    const {Username, Email, Password, CreatedAt, UpdatedAt} = await req.body;
    const data = await UsersRepository.create([Username, Email, Password, CreatedAt, UpdatedAt])
    if (data) return res.status(201).send("User created successfully!");
  }

  async deleteUserById(req, res) {
    const id = req.params.id;
    const data = await UsersRepository.deleteUserById(id);
    if(data.rowCount === 0) res.send("User Does not exist is DB!")
    if (data) return res.status(200).send("User deleted successfully!");
  }

  async updateUserById(req, res) {
    const id = req.params.id;
    let {Username, Email, Password} = req.body;
    const data = await UsersRepository.findById(id);
    return res.status(200).send({ message: `Updated user with id ${id}` });
  }
}

module.exports = new UsersController();
