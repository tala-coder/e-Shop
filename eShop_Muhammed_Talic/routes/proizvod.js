const express = require('express');
const controllers = require("../controllers/proizvod");
const router = express.Router();

router.get(`/`, controllers.dajProizvode);
router.post(`/`, controllers.dodajProizvod);
router.get(`/:id`, controllers.dajProizvod);
router.put('/:id',controllers.urediProizvod);
router.delete('/:id',controllers.obrisiProizvod);
router.get(`/brojProizvoda`, controllers.brojProizvoda);
router.get(`/izdvojeniProizvodi/:broj?`, controllers.dajIzdvojeneProizvode)







module.exports = router;
