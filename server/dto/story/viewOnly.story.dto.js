class ViewOnlyStory {
  constructor(story) {
    this.title = story.title;
    this.description = story.description;
    this.updatedAt = story.updatedAt.toString();
    this.id = story.id;
    this.author = story.author ? story.author.username : 'Unknown Author!';
    this.authorId = story.authorId;
  }
}
module.exports = { ViewOnlyStory };
