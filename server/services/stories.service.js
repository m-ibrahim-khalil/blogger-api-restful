"use strict";
const { StoriesRepository } = require('../ repositories');
const {ViewOnlyStory, CreateOnlyStory} = require('../dto/story');
const UsersService = require('./users.service');
const {getPagingData} = require('../utils')

class StoriesService {
  constructor() {}

  async findAllStories(limit, offset, page) {
    try{
      const stories = await StoriesRepository.findAll(limit, offset);
      const response = getPagingData(stories, page, limit,  ViewOnlyStory);
      return  {status: 200, message: response};
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
      return {status: 500, message: `Unhandled error: ${err.name}`};
    }
  }

  async findStoriesByAuthor(authorId, limit, offset, page) {
    try{
      const stories = await StoriesRepository.findByAuthorId(authorId, limit, offset);
      const response = getPagingData(stories, page, limit,  ViewOnlyStory);
      return {status: 200, message: response};
    }catch(err){
      return {status: 500, message: `Unhandled error: ${err.name}`};
    }
  }

  async createStory(title, description, username) {
    try{
      const {status, message: user} = await UsersService.findUser(username);
      if(status.toString().startsWith('4' || '5')) return {status: status, message: user};
      const createdStory = await StoriesRepository.create(title, description, user.id);
      return {status: 201, message: new CreateOnlyStory(createdStory)};
    }catch(err){
      return {status: 500, message: `Unhandled error: ${err.name}`};
    }
  }

  async updateStoryById(id, title, description) {
    try{
      const story = await StoriesRepository.updateStory(id, title, description);
      if (!story[0]) {
          return {status: 404, message: 'Story not found'};
      }
      return {status: 200, message: 'Story updated!'};
    }catch(err){
      return {status: 500, message: `Unhandled error: ${err.name}`};
    }
  }

  async deleteStoryById(id) {
    try{
      const story = await StoriesRepository.deleteStory(id);
      if (!story) {
          return {status: 404, message: 'Story not found'};
      }
      return {status: 202, message: 'Story removed!'};
    }catch(err){
      return {status: 500, message: `Unhandled error: ${err.name}`};
    }
  }
}

module.exports = new StoriesService();