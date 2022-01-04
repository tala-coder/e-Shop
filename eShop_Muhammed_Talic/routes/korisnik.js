const express = require('express');
const controllers = require("../controllers/korisnik");
const router = express.Router();

router.get(`/register`,  controllers.registrujSeForma);
router.get(`/login`, controllers.logujSeForma);


router.get(`/`,  controllers.dajKorisnike);
router.get(`/:id`,  controllers.dajKorisnika);
router.post(`/register`, controllers.registrujSe);
router.post(`/login`, controllers.logujSe);
router.put('/:id',controllers.urediKorisnika);
router.delete('/:id', controllers.obrisiKorisnika);

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