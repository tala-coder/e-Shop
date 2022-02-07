const express = require('express');
const router = express.Router();
const korisnik = require("../controllers/korisnik");
const proizvod = require("../controllers/proizvod");
const auth = require("../helpers/authMiddleware");
const kategorija = require("../controllers/kategorija");
const narudzba = require("../controllers/narudzba");
const {brojkategorija} = require("../controllers/kategorija");



/*      HEAD ADMIN      */
router.get(`/headadmin`,  korisnik.dajKorisnike, korisnik.statistika, narudzba.dajGodisnjuZaradu,
    narudzba.dajMjesecnuZaradu, kategorija.dajKategorije, kategorija.brojkategorija,
    function (req, res){
    let title = req.query;
        res.render('HEADadmin', { prihodiMjesec: req.prihodiMjesec, prihodiGodina: req.prihodiGodina,
            korisnici: req.korisnici, status: req.status, spol: req.spol,
            kategorije: req.kategorije, title:  title || '', brojkategorija: req.brojkategorija,
            moment: req.moment });
    });

router.put('/headadmin/:id',  korisnik.promeniStatus);




router.get(`/register`, kategorija.dajKategorije,   function(req, res) {
        res.render('register', { kategorija: req.kategorije , title: 'Registracija'});
})

router.get(`/login`,  korisnik.logujSeForma);

router.get('/urediProfil/:id',   korisnik.dajKorisnika, kategorija.dajKategorije, function(req, res) {
        res.render('urediProfil', { korisnik: req.korisnik, kategorija: req.kategorije  } )
});


router.get(`/:id`,   korisnik.dajKorisnika, proizvod.dajProizvodeKorisnika, korisnik.dajKomentare, // moguci bug, konfuzija
    function (req, res){
        res.render('korisnik', { korisnik: req.korisnik, paramsId: req.params.id,  recenzija: req.recenzija,  proizvod: req.proizvod,  moment: req.moment });
});


router.get(`/`,  korisnik.dajKorisnike, );
router.post(`/register`,  korisnik.registrujSe);
router.post(`/login`, korisnik.logujSe);
router.delete('/:id',    korisnik.obrisiKorisnika);
router.post('/urediProfil/:id', auth.jelArhiviran,  korisnik.uploadSingle, korisnik.urediKorisnika);    // Pokusat sa NPM od profesora
router.post('/:id/dodajKomentar', auth.jelArhiviran, korisnik.dodajKomentar);    // Pokusat sa NPM od profesora

// router.put('/:id', korisnik.uploadSingle,  korisnik.urediKorisnika);

// router.get(`/get/count`, controllers.brojKorisnika ); // adminstrator



module.exports = router;