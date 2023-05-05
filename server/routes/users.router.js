'use strict';

const express = require('express');

const UsersRouter = express.Router();
const { UsersController } = require('../controllers');
const { UserAuthorizationMiddleware, AuthenticationMiddleware } = require('../middlewares');


UsersRouter.route('/').get(UsersController.getAllUsers);

UsersRouter.route('/:username')
  .get(UsersController.getUserByUsername)
  .put(AuthenticationMiddleware, UserAuthorizationMiddleware, UsersController.updateByUsername)
  .delete(AuthenticationMiddleware, UserAuthorizationMiddleware, UsersController.deleteByUsername);

module.exports = UsersRouter;
