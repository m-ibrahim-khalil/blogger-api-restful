class ViewOnlyStory{
    constructor(story){
        this.title = story.title;
        this.description = story.description;
        this.updatedAt = story.updatedAt;
        this.id = story.id;
        this.author = story.author ? story.author.username : "Unknown Author!"
    }
}
module.exports = {ViewOnlyStory};    