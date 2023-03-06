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
      }
  }

  async findById(id) {
    try{
        const data = await db.query("SELECT * FROM users WHERE Id = $1", [id]);
        console.log(data.rows);
        return data;
      } catch(err){
        console.log(err.stack);
      }
  }

  async findByUsername(userName) {
    try{
        const data = await db.query("SELECT * FROM users WHERE Username = $1", [userName]);
        console.log(data.rows);
        return data;
      } catch(err){
        console.log(err.stack);
      }
  }

  async findByEmail(email) {
    try{
        const data = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        console.log(data.rows);
        return data;
      } catch(err){
        console.log(err.stack);
      }
  }

  async create(user) {
    try{
        const data = await db.query("INSERT INTO users (Username, Email, Password, CreatedAt, UpdatedAt) VALUES ($1, $2, $3, $4, $5)", user);
        console.log(data.rows);
        return data;
      } catch(err){
        console.log(err.stack);
      }
  }

  async deleteUserById(id) {
    try{
        const data = await db.query("DELETE FROM users WHERE Id = $1", [id]);
        console.log(data);
        return data;
      } catch(err){
        console.log(err.stack);
      }
  }

}

module.exports = new UsersRepository();