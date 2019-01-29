const express = require('express');
const router = express.Router();
const userModel = require('../models/User');

/* GET */
router.get('/logout', (req, res) => {
  req.session.user = null;
  res.redirect('/');
});

/* POST */
router.post('/signup', (req, res) => {
  userModel.findOne(
    { email: req.body.email },
    (err, user) => {
      if (!user) {
        const user = {
          username: req.body.username,
          email: req.body.email.toLowerCase(),
          password: req.body.password
        };

        const newUser = new userModel(user);

        newUser.save((err, user) => {
          req.session.user = user;
          res.redirect('/weather');
        });
      } else {
        console.log('User already exist');
        res.redirect('/');
      }
    }
  );
});

router.post('/signin', (req, res) => {
  userModel.findOne(
    { email: req.body.email.toLowerCase() },
    (err, user) => {
      if (user && user.password == req.body.password) {
        req.session.user = user;
        res.redirect('/weather');
      } else {
        console.log('Wrong password');
        res.redirect('/');
      }
    }
  );
});

module.exports = router;
