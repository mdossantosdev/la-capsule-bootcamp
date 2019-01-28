const mongoose = require('mongoose');

// Schema
const CitySchema = mongoose.Schema({
  name: String,
  description: String,
  image: String,
  tempMin: Number,
  tempMax: Number
});

// Model
const CityModel = mongoose.model('cities', CitySchema);

module.exports = CityModel;
