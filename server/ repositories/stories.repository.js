'use strict';

const Story = require('../models/Story');

class StorysRepository {
  constructor() {}

  async findAll(limit, offset) {
    const stories = await Story.findAndCountAll({
      limit,
      offset,
      include: 'author',
    });
    return stories;
  }

  async findById(id) {
    const story = await Story.findOne({
      where: {
        id,
      },
      include: 'author',
    });
    return story;
  }

  async findByAuthorId(authorId, limit, offset) {
    const stories = await Story.findAndCountAll({
      where: {
        authorId,
      },
      include: 'author',
      limit,
      offset,
    });
    return stories;
  }

  async create(title, description, authorId) {
    const story = await Story.create({
      title,
      description,
      authorId,
    });
    return story;
  }

  async updateById(id, title, description) {
    const data = await Story.update(
      { title, description },
      {
        where: {
          id,
        },
      }
    );
    return data;
  }

  async deleteById(id) {
    const data = await Story.destroy({
      where: {
        id,
      },
    });
    return data;
  }
}

module.exports = new StorysRepository();
