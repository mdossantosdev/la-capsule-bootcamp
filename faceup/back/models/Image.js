const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
  url: String,
  name: String,
});

const ImageModel = mongoose.model('images', ImageSchema);

module.exports = ImageModel;
