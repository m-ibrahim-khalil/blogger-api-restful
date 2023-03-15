'use strict';
const express = require('express');
const StoriesRouter = express.Router();
const { StoriesControler } = require('../controllers');

StoriesRouter.route('/')
  .get(StoriesControler.getAllStories)
  .post(StoriesControler.createStory);

StoriesRouter.route('/:id')
  .get(StoriesControler.getStroyById)
  .put(StoriesControler.updateStoryById)
  .delete(StoriesControler.deleteStoryById);

StoriesRouter.route('/:authorId')
  .get(StoriesControler.getStroiesByAuthor);

module.exports = StoriesRouter;