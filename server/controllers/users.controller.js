'use strict';

// const bcrypt = require('bcrypt')

class UsersController {

  constructor() {}

  getAllUsers(req, res) {
    return res.status(200).send({ message: `Get all users` });
  }

  createUser(req, res) {
    let user = req.body;
    return res.status(201).send({ message: `Created new user ${user}` });
  }

  getUserById(req, res) {
    const id = req.params.id;
    return res.status(200).send({ message: `Get user with id ${id}` });
  }

  updateUserById(req, res) {
    const id = req.params.id;
    return res.status(200).send({ message: `Updated user with id ${id}` });
  }

  deleteUserById(req, res) {
    const id = req.params.id;
    return res.status(200).send({ message: `Deleted user with id ${id}` });
  }

}

module.exports = new UsersController();
