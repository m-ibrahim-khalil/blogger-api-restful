class CreateOnlyUser {
  constructor(user) {
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
    this.createdAt = user.createdAt.toString();
    this.updatedAt = user.updatedAt.toString();
    this.id = user.id;
  }
}
module.exports = { CreateOnlyUser };
