"use strict";
const {StoriesService} = require('../services');
const {BadRequestError} = require('../errors'); 

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

  async getStoryById(req, res, next) {
    try{
      const id = req.params.id;
      if(!id) throw new BadRequestError({name: 'Validation Error!', description: 'Missing story id paramenter!'});
      const {status, message: story} = await StoriesService.findStoryById(id);
      return res.status(status).send({message: story});
    }catch(err){
      next(err);
    }
  }

  async getStroiesByAuthor(req, res, next) {
    try{
      const authorId = req.params.authorId;
      if(!authorId) throw new BadRequestError({name: 'Validation Error!', description: 'Missing authorId paramenter!'});
      const {status, message: stories} = await StoriesService.findStoriesByAuthor(authorId);
      return res.status(status).send({message: stories});
    }catch(err){
      next(err);
    }
  }

  async createStory(req, res, next) {
    try{
      const {title, description} = await req.body;
      const username = req.username;
      if (!title || !description) throw new BadRequestError({name: 'Validation Error!', description: 'title and description are required!'});
      const {status,message: story} = await StoriesService.createStory(title, description, username);
      return res.status(status).send({message: story});
    }catch(err){
      next(err);
    }
  }

  async updateStoryById(req, res, next) {
    try{
      const id = req.params.id;
      if(!id) throw new BadRequestError({name: 'Validation Error!', description: 'Missing story id paramenter!'});
      const { title, description}  = req.body;
      if (!title || !description) throw new BadRequestError({name: 'Validation Error!', description: 'title and description are required!'});
      const {status, message: body} = await StoriesService.updateStoryById(id, title, description);
      return res.status(status).send({ message:  body});
    }catch(err){
      next(err);
    }
  }

  async deleteStoryById(req, res, next) {
    try{
      const id = req.params.id;
      if(!id) throw new BadRequestError({name: 'Validation Error!', description: 'Missing story id paramenter!'});
      const {status, message: story} = await StoriesService.deleteStoryById(id);
      return res.status(status).send(story);
    }catch(err){
      next(err);
    }
  }
}

module.exports = new StoriesControler();
