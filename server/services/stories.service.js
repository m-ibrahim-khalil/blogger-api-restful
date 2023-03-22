"use strict";
const { StoriesRepository } = require('../ repositories');
const {ViewOnlyStory, CreateOnlyStory} = require('../dto/story');
const UsersService = require('./users.service');
const {HTTP404NotFoundError} = require('../errors');


class StoriesService {
  constructor() {}

  async findAllStories() {
    try{
      const stories = await StoriesRepository.findAll();
      return  {status: 200, message: stories.map(story => new ViewOnlyStory(story))};
    }catch(err){
      throw err;
    }
  }

  async findStoryById(id) {
    try{
      const story = await StoriesRepository.findById(id);
      if (!story) throw new HTTP404NotFoundError({name: 'Not Found', description:'story does not exists!'});
      return {status: 200, message: new ViewOnlyStory(story)};
    }catch(err){
      throw err;
    }
  }

  async findStoriesByAuthor(authorId) {
    try{
      const stories = await StoriesRepository.findByAuthorId(authorId);
      return {status: 200, message: stories.map(story => new ViewOnlyStory(story))};
    }catch(err){
      throw err;
    }
  }

  async createStory(title, description, username) {
    try{
      const {status, message: user} = await UsersService.findUser(username);
      const createdStory = await StoriesRepository.create(title, description, user.id);
      return {status: 201, message: new CreateOnlyStory(createdStory)};
    }catch(err){
      throw err;
    }
  }

  async updateStoryById(id, title, description) {
    try{
      const story = await StoriesRepository.updateStory(id, title, description);
      if (!story[0]) throw new HTTP404NotFoundError({name: 'Not Found', description:'story does not exists!'});
      return {status: 200, message: 'Story updated!'};
    }catch(err){
      throw err;
    }
  }

  async deleteStoryById(id) {
    try{
      const story = await StoriesRepository.deleteStory(id);
      if (!story) throw new HTTP404NotFoundError({name: 'Not Found', description:'story does not exists!'});
      return {status: 202, message: 'Story removed!'};
    }catch(err){
      throw err;
    }
  }
}

module.exports = new StoriesService();