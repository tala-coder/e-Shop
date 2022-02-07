//Ctrl+Alt+L foramt code
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const auth = require('./helpers/authMiddleware');
var app = express();



// Povezivanje servera sa bazom
// import connectDB from "./helpers/configDB";
const DB = require("./helpers/mongoConnect")
DB.connectDB();


//env
const dotenv = require('dotenv')
dotenv.config({path:__dirname+'/.env'});


app.use(logger('dev'));
// TODO: ukloniti komentar // use JWT auth to secure the api
// app.use(authJwt());
// global error handler
// app.use(errorHandler);



const indexRoutes = require('./routes/index');
const soketiRoutes = require('./routes/soketi');
const kategorijaRoutes = require('./routes/kategorija');
const proizvodRoutes = require('./routes/proizvod');
const korisnikRoutes = require('./routes/korisnik');
const narudzbaRoutes = require('./routes/narudzba');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public/images', express.static  (__dirname +'/public/images'));
// app.use(express.static(__dirname + '/public'));
// const publicDirectoryPath = path.join(__dirname, '../public')
// app.use(express.static(publicDirectoryPath))
// app.use(express.static(path.join(__dirname, 'public')));
/*
app.use(`/TalaShop/kategorija`, kategorijaRoutes);
app.use(`/TalaShop/proizvod`,   proizvodRoutes);
app.use(`/TalaShop/korisnik`,   korisnikRoutes);
app.use(`/TalaShop/narudzba`,   narudzbaRoutes);
*/

app.use('*', auth.checkUser);
app.use(`/TalaShop`, indexRoutes);
app.use(`/TalaShop/soketi`, soketiRoutes);
app.use(`/TalaShop/kategorija`, kategorijaRoutes);
app.use(`/TalaShop/proizvod`,   proizvodRoutes);
app.use(`/TalaShop/korisnik`,   korisnikRoutes);
app.use(`/TalaShop/narudzba`,   narudzbaRoutes);

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