'use strict';

const express = require('express');
const UsersRouter = express.Router();

const { UsersController } = require('../controllers');

UsersRouter.route('/')
  .get(UsersController.getAllUsers)
  .post(UsersController.createUser);

UsersRouter.route('/:id')
  .get(UsersController.getUserById)
  .put(UsersController.updateUserById)
  .delete(UsersController.deleteUserById);

module.exports = UsersRouter;
