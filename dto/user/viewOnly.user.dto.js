class ViewOnlyUser {
  constructor(user) {
    this.username = user.username;
    this.email = user.email;
    this.createdAt = user.createdAt.toString();
    this.updatedAt = user.updatedAt.toString();
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.bio = user.bio;
    this.gender = user.gender;
    this.birthDate = user?.birthDate?.toString();
  }
}
module.exports = { ViewOnlyUser };
