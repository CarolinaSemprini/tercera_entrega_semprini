export default class UsersDTO {
  constructor(users) {
    this._id = users._id;
    this.first_name = users.first_name;
    this.last_name = users.last_name;
    this.age = users.age;
    this.email = users.email;
    this.password = users.password;
    this.role = users.role;
    this.premium = users.premium;
    this.cartID = users.cartID;
    this.purchase_made = users.purchase_made;
    this.last_connection = users.last_connection;
    this.documents = users.documents;
  }
}
