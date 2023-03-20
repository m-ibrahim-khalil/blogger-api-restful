"use strict";
const {AuthService} = require('../services');
const CustomAPIError = require('../errors'); 

class AuthController {
  constructor() {}

  async register(req, res, next) {
    try{
      const {Username, Email, Password} = await req.body;
      if (!Username || !Email || !Password) throw new CustomAPIError.BadRequestError('Invalid request body!');
      const {status,message, accessToken} = await AuthService.registerUser(Username, Email, Password);
      res.cookie('jwt', accessToken, {httpOnly: true});
      return res.status(status).send(message);
    }catch(e){
      next(e);
    }
  }

  async login(req, res, next) {
    try{
      const {Username, Password} = await req.body;
      if (!Username || !Password) throw new CustomAPIError.BadRequestError('Invalid request body!');
      const {status,message, accessToken} = await AuthService.loginUser(Username, Password);    
      res.cookie('jwt', accessToken, {httpOnly: true});
      return res.status(status).send(message);
    }catch(e){
      next(e);
    }
  }

}

module.exports = new AuthController();
