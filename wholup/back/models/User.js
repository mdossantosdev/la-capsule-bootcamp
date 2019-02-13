const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
});

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;
