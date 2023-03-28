"use strict";
const {createJWT, comparePassword} = require('../utils');
const UserService = require('./users.service');
const {BadRequestError} = require('../errors');
const {StatusCodes} = require('../utils');


class AuthService {
    constructor() {}

    async registerUser(username, email, password) {
        try{
            const {status, message: user} = await UserService.createUser(username, email, password);
            const accessToken = createJWT({username: username});
            return {status: status, message: user, accessToken: accessToken};
        }catch(err){
            throw err;
        }
    }

    async loginUser(username, password){
        try{
            const {status, message: user} = await UserService.findUser(username, false);
            const hashedPassword = user.password
            if(!await comparePassword(password, hashedPassword)){
                throw new BadRequestError({name: "Authentication Failed!", statusCode: StatusCodes.UNAUTHORIZED, description: "Incorrect password!"});
            }
            const accessToken = createJWT({username: username});
            return {status: 200, message: "Login Succes!", accessToken: accessToken};
        } catch(err){
            throw err;
        }
    }
}

module.exports = new AuthService();