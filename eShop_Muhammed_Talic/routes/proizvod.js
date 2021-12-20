const express = require('express');
const controllers = require("../controllers/proizvod");
const router = express.Router();

router.get(`/`, controllers.dajProizvode);
router.post(`/`, controllers.postaviProizvod);




module.exports = router;
