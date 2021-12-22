contrllers = require('../controllers/narudzba')
const express = require('express');
const router = express.Router();

router.get(`/`, contrllers.dajNarudzbe)
router.get(`/:id`, contrllers.dajNarudzbu)

router.post('/', contrllers.postaviNarudzbu)
router.delete('/:id', contrllers.obrisiNarudzbu)
router.put('/:id', contrllers.PromijeniStatusNarudzbe)

module.exports = router;
