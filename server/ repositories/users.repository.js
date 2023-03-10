'use strict';

const db = require("../connectDb");
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
        const data = await User.findAll({
          where: { 
            username: username
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
        const user = await User.create({username: username, email: email, password:password});
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
          username: username
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
            username: username
          }
        });
        return user;
      } catch(err){
        console.log(err.stack);
        throw err;
      }
  }

  async existUsername(username){
    try{
      const user = await User.findAll({
        where: { 
          username: username
         }
      });
      return user;
    } catch(err){
      console.log(err.stack);
      throw err;
    }
    
  }

  async existEmail(email){
    try{
      const user = await User.findAll({
        where: { 
          email: email
         }
      });
      return user;
    } catch(err){
      console.log(err.stack);
      throw err;
    }
  
  

  // async create(username, email, hashedPassword) {
  //   try{
  //       return await db.query(
  //         'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
  //         [username, email, hashedPassword]
  //         );
  //     } catch(err){
  //       console.log(err.stack);
  //       throw err;
  //     }
  // }

  // async updateUser(username, password){
  //   try{
  //     return await db.query(
  //       'UPDATE users SET password = $2, updatedAt = NOW() WHERE username = $1',
  //       [username, password]
  //     );
  //   } catch(err){
  //     console.log(err.stack);
  //     throw err;
  //   }
  // }

  // async removeUser(username) {
  //   try{
  //       return await db.query("DELETE FROM users WHERE username = $1", [username]);
  //     } catch(err){
  //       console.log(err.stack);
  //       throw err;
  //     }
  // }

  // async existUsername(username){
  //   try{
  //     return await db.query('SELECT * FROM users WHERE username = $1', [username]);
  //   } catch(err){
  //     console.log(err.stack);
  //     throw err;
  //   }
    
  // }

  // async existEmail(email){
  //   try{
  //     return await db.query('SELECT * FROM users WHERE email = $1', [email]);
  //   } catch(err){
  //     console.log(err.stack);
  //     throw err;
  //   }
    
  }

  // async findByUsername(userName) {
  //   try{
  //       const data = await db.query("SELECT * FROM users WHERE Username = $1", [userName]);
  //       console.log(data.rows);
  //       return data;
  //     } catch(err){
  //       console.log(err.stack);
  //     }
  // }

  // async findByEmail(email) {
  //   try{
  //       const data = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  //       console.log(data.rows);
  //       return data;
  //     } catch(err){
  //       console.log(err.stack);
  //     }
  // }

}

module.exports = new UsersRepository();