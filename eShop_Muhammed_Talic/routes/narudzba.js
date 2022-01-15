const  narudzba   = require('../controllers/narudzba');
 const express = require('express');
const router = express.Router();

router.get(`/`, narudzba.dajNarudzbe, function(req, res) {
    console.log(req.narudzbe);
    res.render('narudzba',  { narudzba: req.narudzbe , title: 'Narudžbe'});
})

router.get(`/:id`, narudzba.dajNarudzbu)

router.post('/', narudzba.postaviNarudzbu)
router.delete('/:id', narudzba.obrisiNarudzbu)
router.put('/:id', narudzba.PromijeniStatusNarudzbe)

module.exports = router;
