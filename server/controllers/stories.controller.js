"use strict";
const {StoriesService} = require('../services');

class StoriesControler {
  constructor() {}

  async getAllStories(req, res, next) {
    try{
      const {status, message: stories} = await StoriesService.findAllStories();
      return res.status(status).send({message: stories});
    }catch(err){
      next(err);
    }
  }

  async getStoryById(req, res) {
    try{
      const id = req.params.id;
      if(!id) throw new CustomAPIError.BadRequestError('Invalid request parameter!');
      const {status, message: story} = await StoriesService.findStoryById(id);
      return res.status(status).send({message: story});
    }catch(err){
      next(err);
    }
  }

  async getStroiesByAuthor(req, res) {
    try{
      const authorId = req.params.authorId;
      if(!authorId) throw new CustomAPIError.BadRequestError('Invalid request parameter!');
      const {status, message: stories} = await StoriesService.findStoriesByAuthor(authorId);
      return res.status(status).send({message: stories});
    }catch(err){
      next(err);
    }
  }

  async createStory(req, res) {
    try{
      const {title, description} = await req.body;
      const username = req.username;
      if (!title || !description || !username) throw new CustomAPIError.BadRequestError('Invalid request body!');
      const {status,message: story} = await StoriesService.createStory(title, description, username);
      return res.status(status).send({message: story});
    }catch(err){
      next(err);
    }
  }

  async updateStoryById(req, res) {
    try{
      const id = req.params.id;
      if(!id) throw new CustomAPIError.BadRequestError('Invalid request parameter!');
      const { title, description}  = req.body;
      if (!title || !description) throw new CustomAPIError.BadRequestError('Invalid request body!');
      const {status, message: body} = await StoriesService.updateStoryById(id, title, description);
      return res.status(status).send({ message:  body});
    }catch(err){
      next(err);
    }
  }

  async deleteStoryById(req, res) {
    try{
      const id = req.params.id;
      if(!id) throw new CustomAPIError.BadRequestError('Invalid request parameter!');
      const {status, message: story} = await StoriesService.deleteStoryById(id);
      return res.status(status).send(story);
    }catch(err){
      next(err);
    }
  }
}

module.exports = new StoriesControler();
