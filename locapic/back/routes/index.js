const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserModel = require('../models/User');

/* GET */
router.get('/', (req, res) => {
  res.render('index');
});

router.get('/auth/facebook', (req, res, next) => {
  passport.authenticate('facebook', {
    scope: 'email',
    state: JSON.stringify(req.query),
  })(req, res, next);
});

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  (req, res) => {
    res.redirect(
      `${req.user.redirectUrl}
        ?facebookid=${req.user.id}
        &firstName=${req.user.first_name}
        &lastName=${req.user.last_name}
        &email=${req.user.email}
        &picture=${encodeURIComponent(req.user.picture.data.url)}
      `
    );
  }
);

router.get('/locationLog', (req, res) => {
  UserModel.findOne({ facebookid: req.query.facebookid }, (err, user) => {
    if (user) {
      res.json({ locationHistory: user.locationHistory });
    } else {
      res.json({ locationHistory: [] });
    }
  });
});

/* POST */
router.post('/locationLog', (req, res) => {
  UserModel.findOne({ facebookid: req.body.facebookid }, (err, user) => {
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
