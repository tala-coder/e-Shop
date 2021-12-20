const express = require('express');
const router = express.Router();
const controllers = require("../controllers/kategorija")

router.get(`/`, controllers.dajKategorije);
router.get(`/:id`, controllers.dajKategoriju);
router.post('/', controllers.postaviKategoriju);
router.delete('/:id', controllers.obrisiKetegoriju);

module.exports = router;
