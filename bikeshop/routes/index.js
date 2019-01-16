const express = require('express');
const router = express.Router();

const dataBike = [
  { name: 'Model BIKO45', price: 679, url: '/images/bike-1.jpg' },
  { name: 'Model ZOOK7', price: 799, url: '/images/bike-2.jpg' },
  { name: 'Model LIKO89', price: 839, url: '/images/bike-3.jpg' },
  { name: 'Model GEWO', price: 1206, url: '/images/bike-4.jpg' },
  { name: 'Model TITAN5', price: 989, url: '/images/bike-5.jpg' },
  { name: 'Model AMIG39', price: 599, url: '/images/bike-6.jpg' },
];

const shoppingCart = [
  { name: 'Model BIKO45', price: 679, url: '/images/bike-1.jpg', quantity: 1 },
  { name: 'Model ZOOK7', price: 799, url: '/images/bike-2.jpg', quantity: 1 },
];

router.get('/', (req, res) => {
  res.render('home', { dataBike });
});

router.get('/cart', (req, res) => {
  res.render('cart', { shoppingCart });
});

module.exports = router;
