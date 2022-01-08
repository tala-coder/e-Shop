const express = require('express');
const proizvod = require("../controllers/proizvod");
const router = express.Router();

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
