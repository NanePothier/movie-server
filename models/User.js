class User {
  constructor(email, password, firstName, lastName, birthday, planId) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = birthday;
    this.planId = planId;
  }
}

exports.User = User;
