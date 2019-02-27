const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
  url: String,
  name: String,
  age: String,
  gender: String,
});

const ImageModel = mongoose.model('images', ImageSchema);

module.exports = ImageModel;
