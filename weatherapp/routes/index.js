const express = require('express');
const router = express.Router();

const cityList = [
  { name: 'Paris', description: 'Cloudy', image: 'picto-1.png', temp_min: 8, temp_max:19 },
  { name: 'Bordeaux', description: 'Light Rain', image: 'picto-1.png', temp_min: 10, temp_max:20 },
  { name: 'Lyon', description: 'Sunny', image: 'picto-1.png', temp_min: 16, temp_max:25 },
];

/* GET */
router.get('/', (req, res) => {
  res.render('home', { cityList });
});

/* POST */
router.post('/add-city', (req, res) => {
  const city = {
    name: 'New York',
    description: 'Showers',
    image: 'picto-1.png',
    temp_min: 7,
    temp_max: 14,
  };

  cityList.push(city);

  res.redirect('/');
});

router.post('/delete-city', (req, res) => {
  const position = req.body.position;

  cityList.splice(position, 1);

  res.redirect('/');
});

module.exports = router;
