var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let session = require('express-session')
const methodOverride = require('method-override')
const cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let moviesRouter = require('./routes/movie');
const apiMoviesRouter = require('./routes/api/movies');
const apiSeriesRouter = require('./routes/api/series');
const apiUsersRouter = require('./routes/api/users');
const apiEpisodesRouter = require('./routes/api/episodes');
const apiGenresRouter = require('./routes/api/genres');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use(session({
  secret: 'dhmovies',
  resave: false,
  saveUninitialized: true,
}))

app.use(function(req, res, next){
    console.log(req.cookies.lastMovie);
  if(req.session.lastMovie !== undefined){
    res.locals.lastMovie = req.session.lastMovie
  }
  return next()
})


//Rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/movies', moviesRouter);
app.use('/api/movies', apiMoviesRouter);
app.use('/api/genres', apiGenresRouter);
// app.use('/api/series', apiSeriesRouter);
// app.use('/api/users', apiUsersRouter);
// app.use('/api/episodes', apiEpisodesRouter);

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
