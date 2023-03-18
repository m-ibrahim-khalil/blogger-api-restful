'use strict';
const {UsersService, StoriesService} = require('../services');

const authorizationMiddleware = async (req, res, next) => {
    const username = req.username;
    const storyId = req.params.id;
    try{
        const user = await UsersService.findUser(username);
        const story = await StoriesService.findStoryById(storyId);
        const userId = user.message.id;
        const authorId = story.message.authorId;
        if(authorId === userId) next();
        else return res.status(403).send("Protected resources! You have not enough privileges to perform an action on this resource!");
    }
    catch(err){
        return res.status(400).send("unhandled error in db!");
    }
}

module.exports = authorizationMiddleware;