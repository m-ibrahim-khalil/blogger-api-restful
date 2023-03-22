'use strict';
const {UsersService, StoriesService} = require('../services');
const {BadRequestError} = require('../errors');


const StoryAuthorizationMiddleware = async (req, res, next) => {
    const username = req.username;
    const storyId = req.params.id;
    try{
        const user = await UsersService.findUser(username);
        const story = await StoriesService.findStoryById(storyId);
        const userId = user.message.id;
        const authorId = story.message.authorId;
        if(authorId === userId) next();
        else throw new BadRequestError({name: "Authorization Failed!", statusCode: 403, description: "UnAuthorized user!"});
    }
    catch(err){
        throw err;
    }
}

const UserAuthorizationMiddleware = async (req, res, next) => {
    try{
        const username = req.username;
        if(req.params.username === username) next();
        else throw new BaBadRequestError({name: "Authorization Failed!", statusCode: 403, description: "UnAuthorized user!"});
    }
    catch(err){
        throw err;
    }
}

module.exports = {
    StoryAuthorizationMiddleware,
    UserAuthorizationMiddleware
};