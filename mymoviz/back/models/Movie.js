const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
  title: String,
  overview: String,
  poster_path: String,
  movieId: Number
});

const MovieModel = mongoose.model('movies', MovieSchema);

module.exports = MovieModel;
