var express = require('express');
var router = express.Router();
const auth = require("../helpers/authMiddleware");


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(res.locals)
  res.render('home', { title: 'Express' });
});

router.get('/logout', function(req, res) {
  res.cookie('jwt', '', {maxAge: 1});
  res.redirect('/TalaShop');
});


router.get('/test',
    auth.requireAuth, (req, res) =>
  res.render('index', { title: 'test jwt cookie' }));

/*
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

router.get('/registerTrgovina', function(req, res, next) {
  res.render('registerTrgovina', { title: 'Express' });
});*/

module.exports = router;
