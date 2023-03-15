'use strict';
const express = require('express');
const UsersRouter = express.Router();
const { UsersController } = require('../controllers');

UsersRouter.route('/')
  .get(UsersController.getAllUsers);

UsersRouter.route('/:username')
  .get(UsersController.getUserByUsername)
  .put(UsersController.updateUserByUsername)
  .delete(UsersController.deleteUserByUsername);

module.exports = UsersRouter;
