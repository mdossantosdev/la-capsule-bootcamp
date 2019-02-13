const express = require('express');
const router = express.Router();
const userModel = require('../models/User');

/* GET */
router.get('/', (req, res) => {
  res.render('index');
});

/* POST */
router.post('/signin', (req, res) => {
  userModel.findOne(
    {
      email: req.body.email,
      password: req.body.password,
    },
    (error, data) => {
      if (!data) {
        res.json({ result: false, isUser: false });
      } else {
        res.json({ result: true, isUser: true });
      }
    }
  );
});

router.post('/signup', (req, res) => {
  userModel.findOne(
    {
      email: req.body.email,
    },
    (err, user) => {
      if (!user) {
        const user = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: req.body.password,
        };

        const newUser = new userModel(user);

        newUser.save((err, user) => {
          res.json({ result: true, user });
        });
      } else {
        console.log('User already exist');
      }
    }
  );
});

module.exports = router;
