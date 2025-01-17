require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

// DB connexion
require('./config/database');
const UserModel = require('./models/User');

const indexRouter = require('./routes/index');

const app = express();

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_CLIENT_ID,
      clientSecret: process.env.FB_CLIENT_SECRET,
      callbackURL: process.env.FB_CALLBACK_URL,

      profileFields: ['id', 'first_name', 'last_name', 'email', 'picture'],

      passReqToCallback: true,
    },
    (req, accessToken, refreshToken, profile, done) => {
      UserModel.findOne({ facebookid: profile._json.id }, (err, user) => {
        if (!user) {
          const newUser = new UserModel({
            firstname: profile._json.first_name,
            lastname: profile._json.last_name,
            email: profile._json.email,
            facebookid: profile._json.id,
          });
          newUser.save();
        }

        const state = JSON.parse(req.query.state);
        return done(null, { ...profile._json, redirectUrl: state.redirectUrl });
      });
    }
  )
);

app.use(passport.initialize());

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
