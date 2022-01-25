const express = require('express');
const router = express.Router();
const korisnik = require("../controllers/korisnik");
const proizvod = require("../controllers/proizvod");
const auth = require("../helpers/authMiddleware");
const kategorija = require("../controllers/kategorija");


/*      HEAD ADMIN      */
router.get(`/headadmin`,  korisnik.dajKorisnike, korisnik.statistika, kategorija.dajKategorije, /*kategorija.statistika,*/
    function (req, res){
    let title = req.query;
        res.render('HEADadmin', { /*kat: req.kat,*/  korisnici: req.korisnici, status: req.status, spol: req.spol, kategorije: req.kategorije, title:  title || '',

            moment: req.moment });
    });

router.put('/headadmin/:id', korisnik.promeniStatus);




router.get(`/register`, kategorija.dajKategorije,   function(req, res) {
        res.render('register', { kategorija: req.kategorije , title: 'Registracija'});
})

router.get(`/login`,  korisnik.logujSeForma);

router.get('/urediProfil/:id',   korisnik.dajKorisnika, kategorija.dajKategorije, function(req, res) {
        res.render('urediProfil', { korisnik: req.korisnik, kategorija: req.kategorije  } )
});

router.get(`/:id`,  korisnik.dajKorisnika, proizvod.dajProizvodeKorisnika, // moguci bug, konfuzija
    function (req, res){
        res.render('korisnik', { korisnik: req.korisnik, proizvod: req.proizvod,  moment: req.moment });
});


router.get(`/`,  korisnik.dajKorisnike);
router.post(`/register`,  korisnik.registrujSe);
router.post(`/login`, korisnik.logujSe);
router.delete('/:id', korisnik.obrisiKorisnika);
router.post('/urediProfil/:id', korisnik.uploadSingle, korisnik.urediKorisnika);    // Pokusat sa NPM od profesora
// router.put('/:id', korisnik.uploadSingle,  korisnik.urediKorisnika);

// router.get(`/get/count`, controllers.brojKorisnika ); // adminstrator



















/*

router.get(`/`, async (req, res) =>{
    const korisnici = await Korisnik.find().select('-passwordHash');
    if(!korisnici) {
        res.status(500).json({success: false})
    }
    res.send(korisnici);
})

router.post('/login', async (req, res) => {
    const korisnik = await Korisnik.findOne({mail: req.body.mail})
    // const secret = process.env.token_secret;
    if (!korisnik) {
        return res.status(400).send("Korisnik nije registrovan");
    }

    if (korisnik && bcrypt.compareSync(req.body.password, korisnik.passwordHash)){
        const token = jwt.sign(
            {
                userId: korisnik.id,
                jelAdmin: korisnik.jelAdmin  //https://jwt.io DEBUGGER
            },
            'secret',
            {expiresIn : "24h"}
        )
        return res.status(200).send({korisnik: korisnik.mail, token});
    }
    else {
        res.status(400).send("Pogresan password!")
    }
})

router.post(`/`, async (req,res)=>{
    // const salt = await bcrypt.genSaltSync(10);
    let korisnik = new Korisnik({
        nickName:  req.body.nickName,
        imePrezime :  req.body.imePrezime,
        mail : req.body.mail,
        passwordHash : bcrypt.hashSync(req.body.password, 10),
        telefon : req.body.telefon,
        zemlja : req.body.zemlja,
        jelAdmin: req.body.jelAdmin,
        grad : req.body.grad,
        ulica : req.body.ulica,
        postanskiBroj : req.body.postanskiBroj,
    })
    korisnik = await korisnik.save();
    if(!korisnik)
        res.status(400).json({success: false, bug: `exports.registrujSe`});
    res.send(korisnik);
})


*/

/*
router.get(`/`,  controllers.dajKorisnike);
router.get(`/:id`,  controllers.dajKorisnika);
router.post(`/register`, controllers.registrujSe);
router.post(`/login`, controllers.logujSe);*/

module.exports = router;