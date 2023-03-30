'use strict';

const { UsersService, StoriesService } = require('../services');
const { BadRequestError } = require('../errors');
const { StatusCodes } = require('../utils');

const StoryAuthorizationMiddleware = async (req, res, next) => {
  const { username } = req;
  const storyId = req.params.id;
  try {
    const user = await UsersService.findUser(username);
    const story = await StoriesService.findStoryById(storyId);
    const userId = user.message.id;
    const { authorId } = story.message;
    if (authorId === userId) next();
    else
      throw new BadRequestError({
        name: 'Authorization Failed!',
        statusCode: StatusCodes.FORBIDDEN,
        description: 'UnAuthorized user!',
      });
  } catch (err) {
    next(err);
  }
};

const UserAuthorizationMiddleware = async (req, res, next) => {
  try {
    const { username } = req;
    if (req.params.username === username) next();
    else
      throw new BadRequestError({
        name: 'Authorization Failed!',
        statusCode: StatusCodes.FORBIDDEN,
        description: 'UnAuthorized user!',
      });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  StoryAuthorizationMiddleware,
  UserAuthorizationMiddleware,
};
