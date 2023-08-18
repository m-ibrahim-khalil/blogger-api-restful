class CreateOnlyStory {
  constructor(story) {
    this.title = story.title;
    this.description = story.description;
    this.coverImageURL = story.coverImageURL;
    this.createdAt = story.createdAt.toString();
    this.updatedAt = story.updatedAt.toString();
    this.id = story.id;
    this.authorId = story.authorId;
  }
}
module.exports = { CreateOnlyStory };
