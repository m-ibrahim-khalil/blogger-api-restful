class CreateOnlyUser{
    constructor(user){
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
        this.id = user.id;
    }
}
module.exports = {CreateOnlyUser};