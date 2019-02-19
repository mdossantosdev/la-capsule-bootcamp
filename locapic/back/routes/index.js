const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserModel = require('../models/User');

/* GET */
router.get('/', (req, res) => {
  res.render('index');
});

router.get(
  '/auth/facebook',
  passport.authenticate('facebook', { scope: 'email' })
);

router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { session: false }),

  (req, res) => {
    res.redirect(
      `https://auth.expo.io/@mdossantosdev/frontend
        ?userId=${req.user.id}
        &firstName=${req.user.first_name}
        &lastName=${req.user.last_name}
        &email=${req.user.email}
      `
    );
  }
);

router.get('/locationLog', (req, res) => {
  UserModel.findOne(
    { facebookid: req.query.facebookid },
    (err, user) => {
    if (user) {
      res.json({ locationHistory: user.locationHistory });
    } else {
      res.json({ locationHistory: [] });
    }
  });
});

/* POST */
router.post('/locationLog', (req, res) => {
  UserModel.findOne(
    { facebookid: req.body.facebookid },
    (err, user) => {
    if (user) {
      user.locationHistory.push({
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      });

      user.save();
      res.json({ result: true });
    }
  });
});

module.exports = router;
