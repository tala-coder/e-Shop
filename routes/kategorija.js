const express = require('express');
const router = express.Router();
const controllers = require("../controllers/kategorija")
const auth = require("../helpers/authMiddleware");

router.get(`/`, controllers.dajKategorije);
router.get(`/:id`, controllers.dajKategoriju);
router.post('/',  auth.jelArhiviran, controllers.postaviKategoriju);
router.delete('/:id',  auth.jelArhiviran, controllers.obrisiKetegoriju);

module.exports = router;
