"use strict";
const {createJWT, comparePassword} = require('../utils');
const UserService = require('./users.service')


class AuthService {
    constructor() {}

    async registerUser(username, email, password) {
        try{
            const {status, message} = await UserService.createUser(username, email, password);
            if(status.toString().startsWith('4')) return {status: status, message: message};
            const accessToken = createJWT({username: username});
            return {status: status, message: message, accessToken: accessToken};
        }catch(err){
            return {status: 409, message: `Unhandled error: ${err.name}`};
        }
    }

    async loginUser(username, password){
        try{
            const {status, message} = await UserService.findUser(username);
            if(status.toString().startsWith('4')) return {status: status, message: message};
            const data = await UserService.__getPassword(username);
            if(data.status.toString().startsWith('4')) return {status: data.status, message: data.message}
            if(!comparePassword(password, data.password)) return {status: 404, message: 'incorrect password!'};
            const accessToken = createJWT({username: username});
            return {status: 200, message: "Login Succes!", accessToken: accessToken};
        } catch(err){
            return {status: 409, message: `Unhandled error: ${err.name}`};
        }
    }
}

module.exports = new AuthService();