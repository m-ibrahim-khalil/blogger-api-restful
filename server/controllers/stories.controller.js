const { StoriesService } = require('../services');
const { ContentNegotiation, getPagination } = require('../utils');
const {BadRequestError} = require('../errors'); 

class StoriesControler {
  async getAllStories(req, res, next) {
    try{
      const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    const { status, message: stories } = await StoriesService.findAllStories(
      limit,
      offset,
      page
    );
      return new ContentNegotiation(res, status, {
      message: stories,
    }).sendResponse();
    }catch(err){
      next(err);
    }
  }

  async getStoryById(req, res, next) {
    try{
      const { id } = req.params;
      if (!id)  throw new BadRequestError({name: 'Validation Error!', description: 'Missing story id paramenter!'});
      const { status, message: story } = await StoriesService.findStoryById(id);
      return new ContentNegotiation(res, status, {
      message: story,
    }).sendResponse();
    }catch(err){
      next(err);
    }
  }

  async getStroiesByAuthor(req, res, next) {
    try{
      const { authorId } = req.params;
    const { page, size } = req.query;
      if (!authorId)  throw new BadRequestError({name: 'Validation Error!', description: 'Missing authorId paramenter!'});
    const { limit, offset } = getPagination(page, size);
      const { status, message: stories } =
      await StoriesService.findStoriesByAuthor(authorId, limit, offset, page);
      return new ContentNegotiation(res, status, {
      message: stories,
    }).sendResponse();
    }catch(err){
      next(err);
    }
  }

  async createStory(req, res, next) {
    try{
      const { title, description } = await req.body;
      const { username } = req;
      if (!title || !description) throw new BadRequestError({name: 'Validation Error!', description: 'title and description are required!'});
      const { status, message: story } = await StoriesService.createStory(
      title,
      description,
      username
    );
      return new ContentNegotiation(res, status, {
      message: story,
    }).sendResponse();
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
      return new ContentNegotiation(res, status, {
        message: story,
      }).sendResponse();
    }catch(err){
      next(err);
    }
  }

  async deleteStoryById(req, res, next) {
    try{
      const { id } = req.params;
      if (!id)  throw new BadRequestError({name: 'Validation Error!', description: 'Missing story id paramenter!'});
      const { status, message: story } = await StoriesService.deleteStoryById(id);
      return new ContentNegotiation(res, status, {
      message: story,
    }).sendResponse();
    }catch(err){
      next(err);
    }
  }
}

module.exports = new StoriesControler();
