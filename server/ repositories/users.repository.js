'use strict';

const User = require('../models/User');

class UsersRepository {
  constructor() {}

  async findAll(limit, offset) {
    const data = await User.findAndCountAll({ limit, offset });
    return data;
  }

  async findByUsername(username) {
    const data = await User.findOne({
      where: {
        username: username.toLowerCase(),
      },
    });
    return data;
  }

  async create(username, email, password) {
    const user = await User.create({
      username: username.toLowerCase(),
      email,
      password,
    });
    return user;
  }

  async updateByUsername(username, password) {
    const user = await User.update(
      { password },
      {
        where: {
          username: username.toLowerCase(),
        },
      }
    );
    return user;
  }

  async deleteByUsername(username) {
    const user = await User.destroy({
      where: {
        username: username.toLowerCase(),
      },
    });
    return user;
  }

  async findByEmail(email) {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    return user;
  }
}

module.exports = new UsersRepository();
