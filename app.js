var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var passport = require('passport');
var galleryHelpers = require('./app_server/helpers/gallery-helpers');

// Define routers
var indexRouter = require('./app_server/routes/index');
var apiRouter = require('./app_api/routes/index');
var portfolioPersonalRouter = require('./app_server/routes/portfolio-personal');

var app = express();

// Bring in our environment
require('dotenv').config();

// Bring in the database
require('./app_api/config/db');
require('./app_api/config/passport'); // authentication for db and user

/// View engine setup
app.engine(
  'hbs',
  exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'layout-portfolio', // Specify the default layout
    layoutsDir: path.join(__dirname, 'app_server', 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'app_server', 'views', 'partials'),
    helpers: {
      cascadingImages: galleryHelpers.cascadingImages,
    },
  })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app_server', 'views'));

// Middleware: Font caching
const staticConfig = {
  setHeaders: (res, filepath, stat) => {
    if (filepath.endsWith('.ttf') || filepath.endsWith('.otf')) {
      const contentType = filepath.endsWith('.ttf') ? 'font/ttf' : 'font/otf';
      res.set('Content-Type', contentType);
      res.set('Cache-Control', 'public, max-age=31536000');
    }
  }
};

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), staticConfig));
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
app.use('/api', apiRouter);
app.use('/personal', portfolioPersonalRouter);

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
  res.render('pages/common/error');
});

module.exports = app;
