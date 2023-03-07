'use strict';

const db = require("../../connectDb");

class UsersRepository {

  constructor() {}

  async findAll() {
    try{
        const data = await db.query("SELECT * FROM users");
        console.log(data.rows);
        return data;
      } catch(err){
        console.log(err.stack);
        throw err;
      }
  }

  async findOne(Username) {
    try{
        const data = await db.query("SELECT * FROM users WHERE Username = $1", [Username]);
        console.log(data.rows);
        return data;
      } catch(err){
        console.log(err.stack);
        throw err;
      }
  }

  async create(username, email, hashedPassword) {
    try{
        return await db.query(
          'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
          [username, email, hashedPassword]
          );
      } catch(err){
        console.log(err.stack);
        throw err;
      }
  }

  async updateUser(username, password){
    try{
      return await db.query(
        'UPDATE users SET password = $2, updatedAt = NOW() WHERE username = $1',
        [username, password]
      );
    } catch(err){
      console.log(err.stack);
      throw err;
    }
  }

  async removeUser(Username) {
    try{
        return await db.query("DELETE FROM users WHERE Username = $1", [Username]);
      } catch(err){
        console.log(err.stack);
        throw err;
      }
  }

  async existUsername(username){
    try{
      return await db.query('SELECT * FROM users WHERE username = $1', [username]);
    } catch(err){
      console.log(err.stack);
      throw err;
    }
    
  }

  async existEmail(email){
    try{
      return await db.query('SELECT * FROM users WHERE email = $1', [email]);
    } catch(err){
      console.log(err.stack);
      throw err;
    }
    
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