class CreateOnlyStory{
    constructor(story){
        this.title = story.title;
        this.description = story.description;
        this.createdAt = story.createdAt;
        this.updatedAt = story.updatedAt;
        this.id = story.id;
        this.authorId = story.authorId;
    }
}
module.exports = {CreateOnlyStory};