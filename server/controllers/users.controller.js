"use strict";
const {UsersService} = require('../services');
const {BadRequestError} = require('../errors'); 

class UsersController {
  constructor() {}

  async getAllUsers(req, res, next) {
    try{
      const {status, message: users} = await UsersService.findAllUsers();
      return res.status(status).send({message: users});
    }catch(err){
      next(err);
    }
  }

  async getUserByUsername(req, res, next) {
    try{
      const username = req.params.username;
      if(!username) throw new BadRequestError({name: 'Validation Error!', description: 'Missing username paramenter!'});
      const {status, message: user} = await UsersService.findUser(username);
      return res.status(status).send({message: user});
    } catch(err){ 
      next(err);
    }
  }

  async updateUserByUsername(req, res, next) {
    try{
      const username = req.params.username;
      if(!username) {
        throw new BadRequestError({name: 'Validation Error!', description: 'Missing username paramenter!'});
      }
      const { Password }  = req.body;
      if (!Password) {
        throw new BadRequestError({name: 'Validation Error!', description: 'Password shouldnot be empty!'});
      }
      const {status, message: user} = await UsersService.updateUserByUsername(username, Password);
      return res.status(status).send({message: user});
    }catch(err){
      next(err);
    }
  }

  async deleteUserByUsername(req, res, next) {
    try{
      const username = req.params.username;
      if(!username) {
        throw new BadRequestError({name: 'Validation Error!', description: 'Missing username paramenter!'});
      }
      const {status, message: user} = await UsersService.deleteUserByUsername(username);
      return res.status(status).send({message: user});
    }catch(err){
      next(err);
    }
  }
}

module.exports = new UsersController();
