const mongoose = require('mongoose');

// Schema
const UserSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String
});

// Model
const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;
