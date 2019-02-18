const express = require('express');
const router = express.Router();
const passport = require('passport');

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

module.exports = router;
