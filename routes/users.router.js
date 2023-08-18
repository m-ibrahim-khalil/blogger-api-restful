'use strict';

const express = require('express');

const UsersRouter = express.Router();
const { UsersController } = require('../controllers');
const { UserAuthorizationMiddleware, AuthenticationMiddleware } = require('../middlewares');
const { User } = require('../models');


UsersRouter.route('/').get(UsersController.getAllUsers);

UsersRouter.route('/:username')
  .get(UsersController.getUserByUsername)
  .put(AuthenticationMiddleware, UserAuthorizationMiddleware, UsersController.updatePasswordByUsername)
  .delete(AuthenticationMiddleware, UserAuthorizationMiddleware, UsersController.deleteByUsername);

UsersRouter.route('/:username/info')
  .put(AuthenticationMiddleware, UserAuthorizationMiddleware, UsersController.updateUserInfoByUsername);

module.exports = UsersRouter;
