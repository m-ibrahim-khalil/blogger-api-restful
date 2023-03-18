'use strict';
const express = require('express');
const StoriesRouter = express.Router();
const { StoriesControler } = require('../controllers');
const AuthenticationMiddleware = require('../middleware/authentication.middleware')
const AuthorizationMiddleware = require('../middleware/authorization.middleware')

StoriesRouter.route('/')
  .get(StoriesControler.getAllStories)
  .post(AuthenticationMiddleware, StoriesControler.createStory);

StoriesRouter.route('/:id')
  .get(StoriesControler.getStoryById)
  .put(AuthenticationMiddleware, AuthorizationMiddleware, StoriesControler.updateStoryById)
  .delete(AuthenticationMiddleware, AuthorizationMiddleware, StoriesControler.deleteStoryById);

StoriesRouter.route('/:authorId')
  .get(StoriesControler.getStroiesByAuthor);

module.exports = StoriesRouter;