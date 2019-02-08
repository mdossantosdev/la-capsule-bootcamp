const express = require('express');
const router = express.Router();
const axios = require('axios');
const movieModel = require('../models/Movie');
const apiKey = process.env.API_KEY;

/* GET */
router.get('/', (req, res) => {
  res.send('My Moviz Backend');
});

router.get('/movies', (req, res) => {
  axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en&page=1&sort_by=popularity.desc&include_adult=false&include_video=false`)
    .then(response => {
      const movies = response.data.results;

      res.json({ result: true, movies });
    })
    .catch(err => {
      console.log(err.response.data);
    })
});

router.get('/favorites', (req, res) => {
  movieModel.find((error, movies) => {
    res.json({ result: true, movies });
  });
});

/* POST */
router.post('/add-favorites', (req, res) => {
  const newMovie = new movieModel({
    title: req.body.title,
    overview: req.body.overview,
    poster_path: req.body.poster_path,
    idMovieDB: req.body.idMovieDB,
  });

  newMovie.save((error, movie) => {
    res.json({ result: true, movie });
  });
});

/* DELETE */
router.delete('/favorites/:movieId', (req, res) => {
  movieModel.deleteOne(
    { idMovieDB: req.params.movieId },
    (error, response) => {
      res.json({ result: true });
    }
  );
});

module.exports = router;
