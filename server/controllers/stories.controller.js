"use strict";
const {StoriesService} = require('../services');

class StoriesControler {
  constructor() {}

  async getAllStories(req, res) {
    const data = await StoriesService.findAllStories();
    return res.status(data.status).send(data.message);
  }

  async getStroyById(req, res) {
    const id = req.params.id;
    if(!id){
      return res.status(400).send({ message: 'Invalid request parameter!' });
    }
    const data = await StoriesService.findStoryById(id);
    return res.status(data.status).send(data.message);
  }

  async getStroiesByAuthor(req, res) {
    const authorId = req.params.authorId;
    if(!authorId){
      return res.status(400).send({ message: 'Invalid request parameter!' });
    }
    const data = await StoriesService.findStoriesByAuthor(authorId);
    return res.status(data.status).send(data.message);
  }

  async createStory(req, res) {
    const {title, description} = await req.body;
    const username = req.username;
    if (!title || !description || !username) {
      return res.status(400).send({ message: 'Invalid request body' });
    }
    const {status,message} = await StoriesService.createStroy(title, description, username);
    if(status.toString().startsWith('4')){
        return res.status(status).send(message);
    }
    return res.status(status).send(message);
  }

  async updateStoryById(req, res) {
    const id = req.params.id;
    if(!id){
      return res.status(400).send({ message: 'Invalid request parameter!' });
    }
    const { title, description}  = req.body;
    if (!title || !description) {
        return res.status(400).send({ message: 'Invalid request body' });
    }
    const data = await StoriesService.updateStoryById(id, title, description);
    return res.status(data.status).send({ message:  data.message});
  }

  async deleteStoryById(req, res) {
    const id = req.params.id;
    if(!id){
      return res.status(400).send({ message: 'Invalid request parameter!' });
    }
    const data = await StoriesService.removeStoryById(id);
    return res.status(data.status).send(data.message);
  }
}

module.exports = new StoriesControler();
