const { UsersService } = require('../services');
const {BadRequestError} = require('../errors'); 
const { ContentNegotiation } = require('../utils');
const { getPagination } = require('../utils');

class UsersController {
  async getAllUsers(req, res, next) {
    try{
      const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    const { status, message: users } = await UsersService.findAllUsers(
      limit,
      offset,
      page
    );
      return new ContentNegotiation(res, status, {
      message: users,
    }).sendResponse();
    }catch(err){
      next(err);
    }
  }

  async getUserByUsername(req, res, next) {
    try{
      const { username } = req.params;
      if (!username)  throw new BadRequestError({name: 'Validation Error!', description: 'Missing username paramenter!'});
      const { status, message: user } = await UsersService.findUser(username);
      return new ContentNegotiation(res, status, {
      message: user,
    }).sendResponse();
    } catch(err){ 
      next(err);
    }
  }

  async updateUserByUsername(req, res, next) {
    try{
      const { username } = req.params;
      if (!username)  {
        throw new BadRequestError({name: 'Validation Error!', description: 'Missing username paramenter!'});
      }
      const { Password } = req.body;
      if (!Password) {
        throw new BadRequestError({name: 'Validation Error!', description: 'Password shouldnot be empty!'});
      }
      const { status, message: user } = await UsersService.updateUserByUsername(
      username,
      Password
    );
      return new ContentNegotiation(res, status, {
      message: user,
    }).sendResponse();
    }catch(err){
      next(err);
    }
  }

  async deleteUserByUsername(req, res, next) {
    try{
      const { username } = req.params;
      if (!username)  {
        throw new BadRequestError({name: 'Validation Error!', description: 'Missing username paramenter!'});
      }
      const { status, message: user } = await UsersService.deleteUserByUsername(
      username
    );
      return new ContentNegotiation(res, status, {
      message: user,
    }).sendResponse();
    }catch(err){
      next(err);
    }
  }
}

module.exports = new UsersController();
