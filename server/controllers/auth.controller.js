"use strict";
const {AuthService} = require('../services');

class AuthController {
  constructor() {}

  async register(req, res) {
    const {Username, Email, Password} = await req.body;
    if (!Username || !Email || !Password) {
      return res.status(400).send({ message: 'Invalid request body' });
    }
    const {status,message, accessToken} = await AuthService.registerUser(Username, Email, Password);
    if(status.toString().startsWith('4')){
        return res.status(status).send(message);
    }
    res.cookie('jwt', accessToken, {httpOnly: true});
    return res.status(status).send(message);
  }

  async login(req, res) {
    const {Username, Password} = await req.body;
    if (!Username || !Password){
        return res.status(401).send("Username and Password shouldnot be empty!");
    }
    const {status,message, accessToken} = await AuthService.loginUser(Username, Password);
    if(status.toString().startsWith('4')){
        return res.status(status).send(message);
    }
    
    res.cookie('jwt', accessToken, {httpOnly: true});
    return res.status(status).send(message);
  }

}

module.exports = new AuthController();
