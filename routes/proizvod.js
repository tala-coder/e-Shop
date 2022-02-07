const express = require('express');
const router = express.Router();
const proizvod = require("../controllers/proizvod");
const kategorija = require("../controllers/kategorija");
const korisnik = require("../controllers/korisnik");
const auth = require("../helpers/authMiddleware");

router.get('/dodajArtikl', kategorija.dajKategorije, function(req, res) {
    res.render('dodajArtikl', {kategorija: req.kategorije} )
});

router.get('/urediArtikl/:id', kategorija.dajKategorije, proizvod.dajProizvod,
    function(req, res) {
    res.render('urediArtikl', {kategorija: req.kategorije, proizvod: req.proizvod} )
});
router.post('/urediArtikl/:id',  auth.jelArhiviran, proizvod.uploadArray, proizvod.urediProizvod);      // Pokusat sa NPM od profesora

router.post(`/`,  auth.jelArhiviran, proizvod.uploadArray,  proizvod.dodajProizvod);       //redirect na profil page
router.delete('/:id', auth.jelArhiviran, proizvod.obrisiProizvod);  //redirect na profil page
router.get(`/brojProizvoda`, proizvod.brojProizvoda);
router.get(`/izdvojeniProizvodi/:broj?`, proizvod.dajIzdvojeneProizvode)
router.get(`/:id`, proizvod.dajProizvodiKomentar, /*korisnik.dajKorisnikeZaChat, */ korisnik.dajTrenutnogKorisnika,     function(req, res) {
    res.render('proizvod', { proizvod: req.proizvod,  korisnik: req.korisnik, recenzija: req.recenzija,  moment: req.moment  })
});
router.post(`/:id/dodajKomentar`, auth.jelArhiviran,  proizvod.dodajKomentar);       //redirect na profil page


module.exports = router;
