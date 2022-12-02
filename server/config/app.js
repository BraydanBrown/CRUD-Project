let path = require('path');
let createError = require('http-errors');
let express = require('express');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let mongoose = require('mongoose');

let session  = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

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

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

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

//init 
app.use(session({
  secret:"SomeSecret",
  saveUninitialized: false,
  resave:false
}))

// init flash
app.use(flash());

//init passport
app.use(passport.initialize());
app.use(passport.session());

//create user model instance
let userModel = require('../models/user');
let user = userModel.User;

//serialize and deserialize user info
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
module.exports = app;
