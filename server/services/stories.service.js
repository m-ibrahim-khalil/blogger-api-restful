const { StoriesRepository } = require('../ repositories');
const { ViewOnlyStory, CreateOnlyStory } = require('../dto/story');
const UsersService = require('./users.service');
const { HTTP404NotFoundError } = require('../errors');
const { getPagingData } = require('../utils');

class StoriesService {
  async findAllStories(limit, offset, page) {
    const stories = await StoriesRepository.findAll(limit, offset);
    const response = getPagingData(stories, page, limit, ViewOnlyStory);
    return { status: 200, message: response };
  }

  async findStoryById(id) {
    const story = await StoriesRepository.findById(id);
    if (!story)
      throw new HTTP404NotFoundError({
        name: 'Not Found',
        description: 'story does not exists!',
      });
    return { status: 200, message: new ViewOnlyStory(story) };
  }

  async findStoriesByAuthor(authorId, limit, offset, page) {
    const stories = await StoriesRepository.findByAuthorId(
      authorId,
      limit,
      offset
    );
    const response = getPagingData(stories, page, limit, ViewOnlyStory);
    return { status: 200, message: response };
  }

  async createStory(title, description, username) {
    const { message: user } = await UsersService.findUser(username);
    const createdStory = await StoriesRepository.create(
      title,
      description,
      user.id
    );
    return { status: 201, message: new CreateOnlyStory(createdStory) };
  }

  async updateById(id, title, description) {
    const story = await StoriesRepository.updateById(id, title, description);
    if (!story[0])
      throw new HTTP404NotFoundError({
        name: 'Not Found',
        description: 'story does not exists!',
      });
    return { status: 200, message: 'Story updated!' };
  }

  async deleteById(id) {
    const story = await StoriesRepository.deleteById(id);
    if (!story)
      throw new HTTP404NotFoundError({
        name: 'Not Found',
        description: 'story does not exists!',
      });
    return { status: 202, message: 'Story removed!' };
  }
}

module.exports = new StoriesService();
