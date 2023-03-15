class ViewOnlyUser{
    constructor(user){
        this.username = user.username;
        this.email = user.email;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
        this.id = user.id;
    }
}
module.exports = {ViewOnlyUser};    