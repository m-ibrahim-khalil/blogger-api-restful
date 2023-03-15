'use strict';
const User = require('../models/User');

class UsersRepository {

  constructor() {}

  async findAll() {
    try{
        const data = await User.findAll();
        return data;
      } catch(err){
        console.log(err.stack);
        throw err;
      }
  }

  async findByUsername(username) {
    try{
        const data = await User.findOne({
          where: { 
            username: username.toLowerCase()
           }
        });
        return data;
      } catch(err){
        console.log(err.stack);
        throw err;
      }
  }

  async create(username, email, password) {
    try{
        const user = await User.create({username: username.toLowerCase(), email: email, password:password});
        return user;
      } catch(err){
        console.log(err);
        throw err;
      }
  }

  async updateUser(username, password){
    try{
      const user = await User.update({ password: password }, {
        where: {
          username: username.toLowerCase()
        }
      });
      return user;
    } catch(err){
      console.log(err.stack);
      throw err;
    }
  }

  async removeUser(username) {
    try{
        const user = await User.destroy({
          where: {
            username: username.toLowerCase()
          }
        });
        return user;
      } catch(err){
        console.log(err.stack);
        throw err;
      }
  }

  async findByEmail(email){
    try{
      const user = await User.findOne({
        where: { 
          email: email
         }
      });
      return user;
    } catch(err){
      console.log(err.stack);
      throw err;
    }
  }

}

module.exports = new UsersRepository();