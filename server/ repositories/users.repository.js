const User = require('../models/User');

class UsersRepository {
  async findAll(limit, offset) {
    try {
      const data = await User.findAndCountAll({ limit, offset });
      return data;
    } catch (err) {
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
        throw err;
      }
  }

  async create(username, email, password) {
    try{
        const user = await User.create({username: username.toLowerCase(), email: email, password:password});
        return user;
      } catch(err){
        throw err;
      }
  }

  async updateUser(username, password) {
    try {
      const user = await User.update(
        { password },
        {
          where: {
            username: username.toLowerCase(),
          },
        }
      );
      return user;
    } catch(err){
      throw err;
    }
  }

  async deleteUser(username) {
    try{
        const user = await User.destroy({
          where: {
            username: username.toLowerCase()
          }
        });
        return user;
      } catch(err){
        throw err;
      }
  }

  async findByEmail(email) {
    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });
      return user;
    } catch(err){
      throw err;
    }
  }
}

module.exports = new UsersRepository();
