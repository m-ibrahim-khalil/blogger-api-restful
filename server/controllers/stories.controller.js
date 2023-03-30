'use strict';

const { StoriesService } = require('../services');
const { ContentNegotiation, getPagination } = require('../utils');
const { BadRequestError } = require('../errors');

class StoriesControler {
  constructor() {}

  async getAllStories(req, res, next) {
    try {
      const { page, size } = req.query;
      const { limit, offset } = getPagination(page, size);
      const { message } = await StoriesService.findAllStories(
        limit,
        offset,
        page
      );
      return new ContentNegotiation(res, 200, {
        message,
      }).sendResponse();
    } catch (err) {
      next(err);
    }
  }

  async getStoryById(req, res, next) {
    try {
      const { id } = req.params;
      if (!id)
        throw new BadRequestError({
          name: 'Validation Error!',
          description: 'Missing story id paramenter!',
        });
      const { message } = await StoriesService.findStoryById(id);
      return new ContentNegotiation(res, 200, {
        message,
      }).sendResponse();
    } catch (err) {
      next(err);
    }
  }

  async getStroiesByAuthor(req, res, next) {
    try {
      const { authorId } = req.params;
      const { page, size } = req.query;
      if (!authorId)
        throw new BadRequestError({
          name: 'Validation Error!',
          description: 'Missing authorId paramenter!',
        });
      const { limit, offset } = getPagination(page, size);
      const { message } =
        await StoriesService.findStoriesByAuthor(authorId, limit, offset, page);
      return new ContentNegotiation(res, 200, {
        message,
      }).sendResponse();
    } catch (err) {
      next(err);
    }
  }

  async createStory(req, res, next) {
    try {
      const { title, description } = await req.body;
      const { username } = req;
      if (!title || !description)
        throw new BadRequestError({
          name: 'Validation Error!',
          description: 'title and description are required!',
        });
      const { message } = await StoriesService.createStory(
        title,
        description,
        username
      );
      return new ContentNegotiation(res, 201, {
        message,
      }).sendResponse();
    } catch (err) {
      return next(err);
    }
  }

  async updateById(req, res, next) {
    try {
      const { id } = req.params;
      if (!id)
        throw new BadRequestError({
          name: 'Validation Error!',
          description: 'Missing story id paramenter!',
        });
      const { title, description } = req.body;
      if (!title || !description)
        throw new BadRequestError({
          name: 'Validation Error!',
          description: 'title and description are required!',
        });
      const { message } = await StoriesService.updateById(
        id,
        title,
        description
      );
      return new ContentNegotiation(res, 200, {
        message,
      }).sendResponse();
    } catch (err) {
      return next(err);
    }
  }

  async deleteById(req, res, next) {
    try {
      const { id } = req.params;
      if (!id)
        throw new BadRequestError({
          name: 'Validation Error!',
          description: 'Missing story id paramenter!',
        });
      const { message } = await StoriesService.deleteById(id);
      return new ContentNegotiation(res, 202, {
        message,
      }).sendResponse();
    } catch (err) {
      return next(err);
    }
  }
}
module.exports = new StoriesControler();
