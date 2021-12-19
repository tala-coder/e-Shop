//Ctrl+Alt+L foramt code
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const authJwt = require('./helpers/jwt')
const errorHandler = require('./helpers/error-handler');

// Povezivanje servera sa bazom
// import connectDB from "./helpers/configDB";
const DB = require("./helpers/mongoConnect")
DB.connectDB();


//env
const dotenv = require('dotenv')
dotenv.config({path:__dirname+'/.env'});
const nazivShopa = process.env.nazivShopa;


const kategorijaRoutes = require('./routes/kategorija');
const proizvodRoutes = require('./routes/proizvod');
const korisnikRoutes = require('./routes/korisnik');
const narudzbaRoutes = require('./routes/narudzba');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(`/${nazivShopa}/kategorija`, kategorijaRoutes);
app.use(`/${nazivShopa}/proizvod`,   proizvodRoutes);
app.use(`/${nazivShopa}/korisnik`,   korisnikRoutes);
app.use(`/${nazivShopa}/narudzba`,   narudzbaRoutes);

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
