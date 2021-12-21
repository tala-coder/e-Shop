const express = require('express');
// const controllers = require("../controllers/korisnik");
const router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Express' });
});




/*
router.get(`/`,  controllers.dajKorisnike);
router.get(`/:id`,  controllers.dajKorisnika);
router.post(`/register`, controllers.registrujSe);
router.post(`/login`, controllers.logujSe);*/

module.exports = router;