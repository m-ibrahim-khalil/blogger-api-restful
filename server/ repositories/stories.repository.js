const Story = require('../models/Story');

class StorysRepository {
  async findAll(limit, offset) {
    try {
      const stories = await Story.findAndCountAll({
        limit,
        offset,
        include: 'author',
      });
      return stories;
    } catch (err) {
      console.log(err.stack);
      throw err;
    }
  }

  async findById(id) {
    try {
      const story = await Story.findOne({
        where: {
          id,
        },
        include: 'author',
      });
      return story;
    } catch (err) {
      console.log(err.stack);
      throw err;
    }
  }

  async findByAuthorId(authorId, limit, offset) {
    try {
      const stories = await Story.findAndCountAll({
        where: {
          authorId,
        },
        include: 'author',
        limit,
        offset,
      });
      return stories;
    } catch (err) {
      console.log(err.stack);
      throw err;
    }
  }

  async create(title, description, authorId) {
    try {
      const story = await Story.create({
        title,
        description,
        authorId,
      });
      return story;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async updateStory(id, title, description) {
    try {
      const data = await Story.update(
        { title, description },
        {
          where: {
            id,
          },
        }
      );
      return data;
    } catch (err) {
      console.log(err.stack);
      throw err;
    }
  }

  async deleteStory(id) {
    try {
      const data = await Story.destroy({
        where: {
          id,
        },
      });
      return data;
    } catch (err) {
      console.log(err.stack);
      throw err;
    }
  }
}

module.exports = new StorysRepository();
