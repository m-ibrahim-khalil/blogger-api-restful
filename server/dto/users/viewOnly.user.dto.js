class ViewOnlyUser{
    constructor(user){
        this.username = user.username;
        this.email = user.email;
        this.createdat = user.createdat;
        this.updatedat = user.updatedat;
        this.id = user.id;
    }
}
module.exports = {ViewOnlyUser};    