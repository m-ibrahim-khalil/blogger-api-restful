class ViewOnlyStory{
    constructor(story){
        this.title = story.title;
        this.description = story.description;
        this.updatedAt = story.updatedAt.toString();
        this.id = story.id;
        this.authorId = story.authorId
    }
}
module.exports = {ViewOnlyStory};    