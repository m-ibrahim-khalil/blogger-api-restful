const { UsersService } = require('../services');
const { BadRequestError } = require('../errors');
const { ContentNegotiation } = require('../utils');
const { getPagination } = require('../utils');

class UsersController {
  async getAllUsers(req, res, next) {
    try {
      const { page, size } = req.query;
      const { limit, offset } = getPagination(page, size);
      const { message } = await UsersService.findAllUsers(
        limit,
        offset,
        page
      );
      return new ContentNegotiation(res, 200, {
        message,
      }).sendResponse();
    } catch (err) {
      return next(err);
    }
  }

  async getUserByUsername(req, res, next) {
    try {
      const { username } = req.params;
      if (!username)
        throw new BadRequestError({
          name: 'Validation Error!',
          description: 'Missing username parameter!',
        });
      const { message } = await UsersService.findUser(username);
      return new ContentNegotiation(res, 200, {
        message,
      }).sendResponse();
    } catch (err) {
      return next(err);
    }
  }

  async updatePasswordByUsername(req, res, next) {
    try {
      const { username } = req.params;
      if (!username) {
        throw new BadRequestError({
          name: 'Validation Error!',
          description: 'Missing username parameter!',
        });
      }
      const { oldPassword, newPassword } = req.body;
      if (!oldPassword || !newPassword) {
        throw new BadRequestError({
          name: 'Validation Error!',
          description: 'Password should not be empty!',
        });
      }
      const { message} = await UsersService.updatePasswordByUsername(
        username,
        oldPassword, newPassword
      );
      return new ContentNegotiation(res, 200, {
        message,
      }).sendResponse();
    } catch (err) {
      return next(err);
    }
  }

  async updateUserInfoByUsername(req, res, next) {
    try {
      const { username } = req.params;
      if (!username) {
        throw new BadRequestError({
          name: 'Validation Error!',
          description: 'Missing username parameter!',
        });
      }
      const userInfo = req.body;
      if (!userInfo) {
        throw new BadRequestError({
          name: 'Validation Error!',
          description: 'Nothing to update!',
        });
      }
      const { message } = await UsersService.updateUserInfoByUsername(
        username,
        userInfo
      );
      return new ContentNegotiation(res, 200, {
        message,
      }).sendResponse();
    }catch (err) {
      return next(err);
    }
  }

  async deleteByUsername(req, res, next) {
    try {
      const { username } = req.params;
      if (!username) {
        throw new BadRequestError({
          name: 'Validation Error!',
          description: 'Missing username parameter!',
        });
      }
      const { message } = await UsersService.deleteByUsername(
        username
      );
      return new ContentNegotiation(res, 202, {
        message,
      }).sendResponse();
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new UsersController();
