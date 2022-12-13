let path = require('path');
let createError = require('http-errors');
let express = require('express');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let mongoose = require('mongoose');

let session  = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let GitHubStrategy = require('passport-github').Strategy;
let localStrategy = passportLocal.Strategy;
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
  secret:"SomeSecret",
  saveUninitialized: false,
  resave:false
}))

//init passport
app.use(passport.initialize());
app.use(passport.session());


//implement user authentication
passport.use(user.createStrategy());

passport.use(new GitHubStrategy({
  clientID: 'c5570618da907d4ebe25',
  clientSecret: 'd31f021f8fcfd4bf6e5faa20f5571606d475f9bd',
  callbackURL: "http://localhost:3000/github/callback"
},
// function happens before successful authentication and redirection to indicent-list
function(accessToken, refreshToken, profile, cb) {
  console.log(profile)
  user.findOne({ username: profile.username }, (err) => {
    if(err)
    {
      //there is already an existing user
      console.log('User already exixst')
    }
    else
    {
      console.log('no user')
      new user({
        username: profile.username,
        displayName: profile.username
      }).save().then((newUser)=>{
        console.log('new user: ' + newUser);
      });
    }
    // return cb(err, user);
  });
}
));

//serialize and deserialize user info
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
module.exports = app;

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