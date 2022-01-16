var express = require('express');
var router = express.Router();
const auth = require("../helpers/authMiddleware");
const kategorija = require("../controllers/kategorija");
const proizvod = require("../controllers/proizvod");


router.get('/', kategorija.dajKategorije, proizvod.dajProizvode,
    function(req, res) {
        res.render('home', {kategorije: req.kategorije, proizvod: req.proizvod, moment: req.moment, gradovi: req.gradovi})
});

router.get('/test', kategorija.dajKategorije, proizvod.dajIzdvojeneProizvode,
    function(req, res) {
        res.render('home', {kategorije: req.kategorije, proizvod: req.proizvod, moment: req.moment, gradovi: req.gradovi})
});

router.get('/logout', function(req, res) {
  res.cookie('jwt', '', {maxAge: 1});
  res.redirect('/TalaShop');
});




// router.get('/test',
//     auth.requireAuth, (req, res) =>
//   res.render('narudzba', { title: 'test jwt cookie' }));

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
