"use strict";
const {UsersService} = require('../services');
const CustomAPIError = require('../errors'); 

class UsersController {
  constructor() {}

  async getAllUsers(req, res, next) {
    try{
      const {status, message: users} = await UsersService.findAllUsers();
      return res.status(status).send({message: users});
    }catch(e){
      next(e);
    }
  }

  async getUserByUsername(req, res, next) {
    try{
      const username = req.params.username;
      if(!username) throw new CustomAPIError.BadRequestError('Invalid request parameter!');
      const {status, message: user} = await UsersService.findUser(username);
      return res.status(status).send({message: user});
    } catch(e){ 
      next(e);
    }
  }

  async updateUserByUsername(req, res, next) {
    try{
      const username = req.params.username;
      if(!username) throw new CustomAPIError.BadRequestError('Invalid request parameter!');
      const { Password }  = req.body;
      if (!Password) throw new CustomAPIError.BadRequestError('Empty Password body!');
      const {status, message: user} = await UsersService.updateUserByUsername(username, Password);
      return res.status(status).send({message: user});
    }catch(e){
      next(e);
    }
  }

  async deleteUserByUsername(req, res, next) {
    try{
      const username = req.params.username;
      if(!username) throw new CustomAPIError.BadRequestError('Invalid request parameter!');
      const {status, message: user} = await UsersService.deleteUserByUsername(username);
      return res.status(status).send({message: user});
    }catch(e){
      next(e);
    }
  }
}

module.exports = new UsersController();
