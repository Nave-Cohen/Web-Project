class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.username;
    this.email = user.email;
  }
}
module.exports = User;
