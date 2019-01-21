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

/* GET */
router.get('/', (req, res) => {

  // Check Cart or Init Cart
  if (req.session.shoppingCart === undefined) {
    req.session.shoppingCart = [];
  }

  res.render('home', { dataBike });
});

router.get('/cart', (req, res) => {

  // Check Cart or Init Cart
  if (req.session.shoppingCart === undefined) {
    req.session.shoppingCart = [];
  }

  res.render('cart', { shoppingCart: req.session.shoppingCart });
});

/* POST */

// Add bike to cart
router.post('/add-bike', (req, res) => {

  // Data bike
  const bike = {
    name: req.body.bikeName,
    price: req.body.bikePrice,
    url: req.body.bikeImage,
    quantity: parseInt(req.body.bikeQuantity),
  };

  let canUpdate = false;

  for (const bike of req.session.shoppingCart) {
    if (req.body.bikeName === bike.name) {
      canUpdate = true;
      bike.quantity++;
    }
  };

  if (canUpdate === false) {
    // Add product in cart
    req.session.shoppingCart.push(bike);
  };

  res.redirect('/cart');
});

// Delete bike from cart
router.post('/delete-bike', (req, res) => {
  const position = req.body.position;

  // Splice the product from cart array
  req.session.shoppingCart.splice(position, 1);

  res.redirect('/cart');
});

// Update number of bikes
router.post('/update-bike', (req, res) => {
  const position = req.body.position;
  const quantity = parseInt(req.body.quantity);

  // Delete the product from the cart if quantity = 0
  quantity === 0 ? req.session.shoppingCart.splice(position, 1) : req.session.shoppingCart[position].quantity = quantity;

  res.redirect('/cart');
});

module.exports = router;
