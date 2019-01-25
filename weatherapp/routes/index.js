const express = require('express');
const router = express.Router();
const axios = require('axios');
const apiKey = process.env.API_KEY;
const cityModel = require('../models/City');

/* GET */
router.get('/', (req, res) => {
  cityModel.find((err, cityList) => {
    res.render('home', { cityList });
  })
});

/* POST */
router.post('/add-city', (req, res) => {
  const query = req.body.inputSearch;

  axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric&lang=fr`)
    .then((response) => {
      const data = response.data;

      const city = {
        name: data.name,
        description: data.weather[0].description,
        image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
        tempMin: parseInt(data.main.temp_min),
        tempMax: parseInt(data.main.temp_max)
      };

      const newCity = new cityModel(city);

      newCity.save((err, city) => {
        res.redirect('/');
      })
    })
    .catch((err) => {
      console.log(err.response.data);

      if (err) res.redirect('/');
    })
});

router.post('/delete-city', (req, res) => {
  const id = req.body.id;

  cityModel.deleteOne(
    { _id: id },
    (err) => {
      res.redirect('/');
    }
  );
});

module.exports = router;
