"use strict";
const {StoriesService} = require('../services');
const {ContentNegotiation, getPagination} = require('../utils');

class StoriesControler {
  constructor() {}

  async getAllStories(req, res) {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    const {status, message: stories} = await StoriesService.findAllStories(limit, offset, page);
    return new ContentNegotiation(res, status, {message: stories}).sendResponse();
  }

  async getStoryById(req, res) {
    const id = req.params.id;
    if(!id){
      return res.status(400).send({ message: 'Invalid request parameter!' });
    }
    const {status, message: story} = await StoriesService.findStoryById(id);
    return new ContentNegotiation(res, status, {message: story}).sendResponse();
  }

  async getStroiesByAuthor(req, res) {
    const authorId = req.params.authorId;
    const { page, size } = req.query;
    if(!authorId){
      return res.status(400).send({ message: 'Invalid request parameter!' });
    }
    const { limit, offset } = getPagination(page, size);
    const {status, message: stories} = await StoriesService.findStoriesByAuthor(authorId, limit, offset, page);
    return new ContentNegotiation(res, status, {message: stories}).sendResponse();
  }

  async createStory(req, res) {
    const {title, description} = await req.body;
    const username = req.username;
    if (!title || !description || !username) {
      return res.status(400).send({ message: 'Invalid request body' });
    }
    const {status,message: story} = await StoriesService.createStory(title, description, username);
    return new ContentNegotiation(res, status, {message: story}).sendResponse();
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
    const {status, message: story} = await StoriesService.updateStoryById(id, title, description);
    return new ContentNegotiation(res, status, {message: story}).sendResponse();
  }

  async deleteStoryById(req, res) {
    const id = req.params.id;
    if(!id){
      return res.status(400).send({ message: 'Invalid request parameter!' });
    }
    const {status, message: story} = await StoriesService.deleteStoryById(id);
    return new ContentNegotiation(res, status, {message: story}).sendResponse();
  }
}

module.exports = new StoriesControler();
