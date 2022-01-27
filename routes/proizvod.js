const express = require('express');
const router = express.Router();
const proizvod = require("../controllers/proizvod");
const kategorija = require("../controllers/kategorija");
const korisnik = require("../controllers/korisnik");

router.get('/dodajArtikl', kategorija.dajKategorije, function(req, res) {
    res.render('dodajArtikl', {kategorija: req.kategorije} )
});

router.get('/urediArtikl/:id', kategorija.dajKategorije, proizvod.dajProizvod,
    function(req, res) {
    res.render('urediArtikl', {kategorija: req.kategorije, proizvod: req.proizvod} )
});
router.post('/urediArtikl/:id', proizvod.uploadArray, proizvod.urediProizvod);      // Pokusat sa NPM od profesora

router.post(`/`, proizvod.uploadArray,  proizvod.dodajProizvod);       //redirect na profil page
router.delete('/:id',proizvod.obrisiProizvod);  //redirect na profil page
router.get(`/brojProizvoda`, proizvod.brojProizvoda);
router.get(`/izdvojeniProizvodi/:broj?`, proizvod.dajIzdvojeneProizvode)
router.get(`/:id`, proizvod.dajProizvod, korisnik.dajKorisnikeZaChat,      function(req, res) {
    res.render('proizvod', { proizvod: req.proizvod,   moment: req.moment  })
});


module.exports = router;
