"use strict";
const {StoriesService} = require('../services');

class StoriesControler {
  constructor() {}

  async getAllStories(req, res) {
    const {status, message: stories} = await StoriesService.findAllStories();
    return res.status(status).send({message: stories});
  }

  async getStoryById(req, res) {
    const id = req.params.id;
    if(!id){
      return res.status(400).send({ message: 'Invalid request parameter!' });
    }
    const {status, message: story} = await StoriesService.findStoryById(id);
    return res.status(status).send({message: story});
  }

  async getStroiesByAuthor(req, res) {
    const authorId = req.params.authorId;
    if(!authorId){
      return res.status(400).send({ message: 'Invalid request parameter!' });
    }
    const {status, message: stories} = await StoriesService.findStoriesByAuthor(authorId);
    return res.status(status).send({message: stories});
  }

  async createStory(req, res) {
    const {title, description} = await req.body;
    const username = req.username;
    if (!title || !description || !username) {
      return res.status(400).send({ message: 'Invalid request body' });
    }
    const {status,message: story} = await StoriesService.createStory(title, description, username);
    return res.status(status).send({message: story});
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
    const {status, message: body} = await StoriesService.updateStoryById(id, title, description);
    return res.status(status).send({ message:  body});
  }

  async deleteStoryById(req, res) {
    const id = req.params.id;
    if(!id){
      return res.status(400).send({ message: 'Invalid request parameter!' });
    }
    const {status, message: story} = await StoriesService.deleteStoryById(id);
    return res.status(status).send(story);
  }
}

module.exports = new StoriesControler();
