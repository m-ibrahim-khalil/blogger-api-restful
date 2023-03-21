class ViewOnlyUser{
    constructor(user){
        this.username = user.username;
        this.email = user.email;
        this.createdAt = user.createdAt.toString();
        this.updatedAt = user.updatedAt.toString();
        this.id = user.id;
    }
}
module.exports = {ViewOnlyUser};    