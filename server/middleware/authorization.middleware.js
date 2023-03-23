const { UsersService, StoriesService } = require('../services');

const StoryAuthorizationMiddleware = async (req, res, next) => {
  const { username } = req;
  const storyId = req.params.id;
  try {
    const user = await UsersService.findUser(username);
    const story = await StoriesService.findStoryById(storyId);
    const userId = user.message.id;
    const { authorId } = story.message;
    if (authorId === userId) return next();
    return res
      .status(403)
      .send(
        'Protected resources! You have not enough privileges to perform an action on this resource!'
      );
  } catch (err) {
    return res.status(400).send('unhandled error in db!');
  }
};

const UserAuthorizationMiddleware = async (req, res, next) => {
  try {
    const { username } = req;
    if (req.params.username === username) return next();
    return res
      .status(403)
      .send(
        'Protected resources! You have not enough privileges to perform an action on this resource!'
      );
  } catch (err) {
    return res.status(400).send('unhandled error in db!');
  }
};

module.exports = {
  StoryAuthorizationMiddleware,
  UserAuthorizationMiddleware,
};
