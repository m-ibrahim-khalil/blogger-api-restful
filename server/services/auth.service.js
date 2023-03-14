"use strict";
const jwt = require('jsonwebtoken')
const Validator = require('../utils/validator');
const {generateHash} = require('../utils/utility');
const { UsersRepository } = require('../ repositories');
const {ViewOnlyUser, CreateOnlyUser} = require('../dto/users')


class AuthService {
    constructor() {}

    async registerUser(username, email, password) {
        try{
            username = username.toLowerCase();
            const existingUsername = await UsersRepository.existUsername(username);
            if (!Validator.checkEmptyArray(existingUsername)) {
                return {status: 409, message: 'Username already exists'};
            }

            const existingEmail = await UsersRepository.existEmail(email);
            if (!Validator.checkEmptyArray(existingEmail)) {
                return {status: 409, message: 'Email already exists'};
            }
            const hashedPassword = await generateHash(password);
            const createdUser = await UsersRepository.create(username, email, hashedPassword);
            const payload = {username: username};
            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                algorithm: "HS256",
                expiresIn: process.env.ACCESS_TOKEN_LIFE
            })
            return {status: 201, message: new CreateOnlyUser(createdUser), accessToken: accessToken};
        }catch(err){
            return {status: 409, message: `Unhandled error: ${err.name} ---------- ${err.errors[0].message}`};
        }
    }

    async loginUser(username, password){
        try{
            const user = await UsersRepository.findByUsername(username.toLowerCase());
            if (Validator.checkEmptyArray(user)){
                return {status: 404, message: 'username does not exists!'};
            }
            if(!(await user[0].isPasswordCorrect(password))){
                return {status: 404, message: 'incorrect password!'};
            }
            const payload = {username: username};

            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                algorithm: "HS256",
                expiresIn: process.env.ACCESS_TOKEN_LIFE
            })
            const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
                algorithm: "HS256",
                expiresIn: process.env.REFRESH_TOKEN_LIFE
            })
            return {status: 200, message: "Login Succes!", accessToken: accessToken};
        } catch(err){
            return {status: 409, message: `Unhandled error: ${err.name} ---------- ${err.errors[0].message}`};
        }
    }
}

module.exports = new AuthService();