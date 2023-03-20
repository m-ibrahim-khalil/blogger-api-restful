'use strict';
const express = require('express');
const UsersRouter = express.Router();
const { UsersController } = require('../controllers');
const {UserAuthorizationMiddleware} = require('../middleware/authorization.middleware')

UsersRouter.route('/')
  .get(UsersController.getAllUsers);

UsersRouter.route('/:username')
  .get(UsersController.getUserByUsername)
  .put(UserAuthorizationMiddleware, UsersController.updateUserByUsername)
  .delete(UserAuthorizationMiddleware, UsersController.deleteUserByUsername);

module.exports = UsersRouter;
