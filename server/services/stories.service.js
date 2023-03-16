"use strict";
const { StoriesRepository } = require('../ repositories');
const {ViewOnlyStory, CreateOnlyStory} = require('../dto/story');
const UsersService = require('./users.service')

class StoriesService {
  constructor() {}

  async findAllStories() {
    try{
      const stories = await StoriesRepository.findAll();
      return  {status: 200, message: stories.map(story => new ViewOnlyStory(story))};
    }catch(err){
      return {status: 500, message: `Unhandled error: ${err.name}`};
    }
  }

  async findStoryById(id) {
    try{
      const story = await StoriesRepository.findById(id);
      if (!story){
        return {status: 404, message: 'story does not exists!'};
      }
      return {status: 200, message: new ViewOnlyStory(story)};
    }catch(err){
      return {status: 409, message: `Unhandled error: ${err.name}`};
    }
  }

  async findStoriesByAuthor(authorId) {
    try{
      const stories = await StoriesRepository.findByAuthorId(authorId);
      if (!user){
        return {status: 404, message: 'story does not exists!'};
      }
      return {status: 200, message: stories.map(story => new ViewOnlyStory(story))};
    }catch(err){
      return {status: 409, message: `Unhandled error: ${err.name}`};
    }
  }

  async createStroy(title, description, username) {
    try{
      const {message} = await UsersService.findUser(username);
      const createdStory = await StoriesRepository.create(title, description, message.id);
      return {status: 201, message: new CreateOnlyStory(createdStory)};
    }catch(err){
      return {status: 409, message: `Unhandled error: ${err.name}`};
    }
  }

  async updateStoryById(id, title, description) {
    try{
      const story = await StoriesRepository.updateStory(id, title, description);
      if (story[0] === 0) {
          return {status: 404, message: 'Story not found'};
      }
      return {status: 200, message: 'Story updated!'};
    }catch(err){
      return {status: 409, message: `Unhandled error: ${err.name}`};
    }
  }

  async removeStoryById(id) {
    try{
      const story = await StoriesRepository.removeStory(id);
      if (story === 0) {
          return {status: 404, message: 'Story not found'};
      }
      return {status: 202, message: 'Story removed!'};
    }catch(err){
      return {status: 409, message: `Unhandled error: ${err.name}`};
    }
  }
}

module.exports = new StoriesService();