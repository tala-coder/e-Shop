const express = require('express');
const proizvod = require("../controllers/proizvod");
const kategorija = require("../controllers/kategorija");
const router = express.Router();


//test
router.get('/dodajArtikl', kategorija.dajKategorije, function(req, res) {
    res.render('dodajArtikl', {kategorija: req.kategorije} )
});



router.get(`/`, proizvod.dajProizvode,  function(req, res) {
    // console.log(res.locals)
    res.render('index')
});


router.get(`/:id`, proizvod.dajProizvod,     function(req, res) {
    res.render('proizvod', { proizvod: req.proizvod, moment: req.moment  })
});

router.post(`/`, proizvod.dodajProizvod);
router.put('/:id',proizvod.urediProizvod);
router.delete('/:id',proizvod.obrisiProizvod);
router.get(`/brojProizvoda`, proizvod.brojProizvoda);
router.get(`/izdvojeniProizvodi/:broj?`, proizvod.dajIzdvojeneProizvode)


module.exports = router;
