let path = require('path');
let createError = require('http-errors');
let express = require('express');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let mongoose = require('mongoose');

let session  = require('express-session');

let passport = require('passport');
let passportLocal = require('passport-local');
let LocalStrategy = passportLocal.Strategy;

var GitHubStrategy = require('passport-github2').Strategy;

var GITHUB_CLIENT_ID = process.env["gitClientID"];
var GITHUB_CLIENT_SECRET = process.env["gitClientSecret"];

// var GoogleStrategy = require('passport-google-oidc').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;

var GOOGLE_CLIENT_ID = process.env["GoogleClientID"];
var GOOGLE_CLIENT_SECRET = process.env["GoogleClientSecret"];

var FacebookStrategy = require('passport-facebook').Strategy;

var FACEBOOK_APP_ID = process.env["FacebookAppID"];
var FACEBOOK_APP_SECRET = process.env["FacebookAppSecret"];

let flash = require('connect-flash');
let userModel = require('../models/user');
let user = userModel.user;

let app = express();

//config mongoDB
const uri = process.env.URI;
//point mongoose to DB URI
mongoose.connect(uri);

let mongDB = mongoose.connection;
mongDB.on('error', console.error.bind(console, 'Connection Error:'));
mongDB.once('open', ()=> {
  console.log("Connected to MongoDB...");
});


//Add new router modules
let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let incidentsRouter = require('../routes/incident');

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

// init flash
app.use(flash());

//init 
app.use(session({
  secret:process.env.SECRET,
  saveUninitialized: false,
  resave:false
}))

//serialize and deserialize user info

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
})

//implement user authentication
passport.use(user.createStrategy());

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    process.nextTick(function () {    
      return cb(null, profile);
    });
  }
));

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://127.0.0.1:3000/oauth2/redirect/google',
    passReqToCallback: true
  },
  function (request, accessToken, refreshToken, profile, cb) {
    console.log('passport callback function called');
    console.log(profile);

    process.nextTick(function () {
      return cb(null, profile);
    });
  }
));

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    process.nextTick(function () {
      return cb(null, profile);
    });
  }
));

//init passport
app.use(passport.initialize());
app.use(passport.session());

//Add new router modules
app.use('/', indexRouter);
app.use('/users', usersRouter);

//incident list ROUTE, DISPLAYS incident list database
app.use('/incident-list', incidentsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
