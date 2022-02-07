const  narudzba   = require('../controllers/narudzba');
const  korisnik   = require('../controllers/korisnik');
 const express = require('express');
const auth = require("../helpers/authMiddleware");
const router = express.Router();


/*  KORPA   */
router.get(`/korpa`, narudzba.dajNarudzbe, korisnik.dajTrenutnogKorisnika,  function(req, res) {
    res.render('korpa',  { korpa: req.korpa , korisnik: req.korisnik , title: 'Korpa', popust: '-50%', dostava: '7'});
})
/*  NARUDZBE  */
router.get(`/`, narudzba.dajNarudzbe, korisnik.dajTrenutnogKorisnika,  function(req, res) {
let title = req.query.status;
    res.render('narudzba',  { poslato: req.poslano, odobreno: req.odobreno, odbijeno: req.odbijeno,
        poslato_kupac: req.poslano_kupac, odobreno_kupac: req.odobreno_kupac, odbijeno_kupac: req.odbijeno_kupac,
        korisnik: req.korisnik , title: title  || '' });
})


router.post('/korpa',  auth.jelArhiviran, narudzba.PromijeniStatusNarudzbe);

/*  NARUDZBE    */
router.post('/',  auth.jelArhiviran, narudzba.dodajNarudzbu)
router.delete('/:id',  auth.jelArhiviran, narudzba.obrisiNarudzbu)
router.put('/:id',  auth.jelArhiviran, narudzba.PromijeniStatusNarudzbe);
router.get(`/prihodi/mjesec`, narudzba.dajMjesecnuZaradu)
router.get(`/prihodi/godina`, narudzba.dajGodisnjuZaradu)

module.exports = router;
