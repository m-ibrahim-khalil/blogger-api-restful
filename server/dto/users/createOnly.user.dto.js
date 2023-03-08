class CreateOnlyUser{
    constructor(user){
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
        this.createdAt = user.createdat;
        this.updatedAt = user.updatedat;
        this.id = user.id;
    }
}
module.exports = {CreateOnlyUser};