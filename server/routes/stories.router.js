'use strict';

const express = require('express');

const StoriesRouter = express.Router();
const { StoriesControler } = require('../controllers');
const {
  AuthenticationMiddleware,
  StoryAuthorizationMiddleware,
} = require('../middlewares');

StoriesRouter.route('/')
  .get(StoriesControler.getAllStories)
  .post(AuthenticationMiddleware, StoriesControler.createStory);

StoriesRouter.route('/:id')
  .get(StoriesControler.getStoryById)
  .put(
    AuthenticationMiddleware,
    StoryAuthorizationMiddleware,
    StoriesControler.updateById
  )
  .delete(
    AuthenticationMiddleware,
    StoryAuthorizationMiddleware,
    StoriesControler.deleteById
  );

StoriesRouter.route('/author/:authorId').get(
  StoriesControler.getStroiesByAuthor
);

module.exports = StoriesRouter;
