const mongoose = require('mongoose');

const LocationSchema = mongoose.Schema({
  latitude: Number,
  longitude: Number,
});

const UserSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  facebookid: String,
  locationHistory: [LocationSchema],
});

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;
