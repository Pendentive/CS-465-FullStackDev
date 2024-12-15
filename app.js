var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
//var handlebars = require('hbs');
var passport = require('passport');

// Define routers
var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var travelRouter = require('./app_server/routes/travel');
var loginRouter = require('./app_server/routes/login');
var adminRouter = require('./app_server/routes/admin');
var checkoutRouter = require('./app_server/routes/checkout');
var newsRouter = require('./app_server/routes/news');
var reservationsRouter = require('./app_server/routes/reservations'); 
var apiRouter = require('./app_api/routes/index');

var app = express();

// Bring in our environment
require('dotenv').config();

// Bring in the database
require('./app_api/models/db');
require('./app_api/config/passport'); // authentication for db and user

/// View engine setup
app.engine(
  'hbs',
  exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'layout', // Specify the default layout
    layoutsDir: path.join(__dirname, 'app_server', 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'app_server', 'views', 'partials'),
  })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app_server', 'views'));


// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

// Enable CORS
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// Wire routes to controllers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);
app.use('/login', loginRouter);
app.use('/admin', adminRouter);
app.use('/checkout', checkoutRouter);
app.use('/news', newsRouter);
app.use('/reservations', reservationsRouter);
app.use('/api', apiRouter);

// catch unauthorized error and create 401
app.use((err, req, next) => {
  if (err.name === 'UnauthorizedError') {
    res
      .status(401)
      .json({"message": err.name + ": " + err.message});
  }
});

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
