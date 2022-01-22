const Korisnik = require('../models/korisnik');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const asyncHandler = require('express-async-handler')
const multer  = require('multer');
const { storage } = require('../helpers/multer');
const upload = multer({ storage: storage })
exports.uploadSingle = upload.single('avatar');


exports.logujSeForma = asyncHandler(async function(req, res) {
    res.render('login', { title: 'Login' });
})

exports.dajKorisnike = async (req, res, next) =>{
    const korisnici = await Korisnik.find().select('-passwordHash');
    if(!korisnici) {
        res.status(500).json({success: false})
    }
    // res.send(korisnici);
    req.korisnici = korisnici;
    next();
}


exports.urediKorisnika =  asyncHandler( async (req, res)=> {
    if(!mongoose.isValidObjectId(req.params.id))
        return res.status(400).json({message: `ID korisnika ne postoji`})

//     // const salt = await bcrypt.genSaltSync(10);
//     // let pass = await bcrypt.hashSync(req.body.password, salt);

    if(!req.file)
        return res.status(400).send('Niste dodali sliku!');

    const putanja = `${req.protocol}://${req.get('host')}/public/images/${req.file.filename}`
    const korisnik = await Korisnik.findByIdAndUpdate(req.params.id,
        {
            nickName: req.body.nickName,
            ime:  req.body.ime,
            prezime :  req.body.prezime,
            mail : req.body.mail,
            // passwordHash : pass,
            telefon : req.body.telefon,
            zemlja : req.body.zemlja,
            jelAdmin: req.body.jelAdmin,
            grad : req.body.grad,
            spol : req.body.spol,
            ulica : req.body.ulica,
            postanskiBroj : req.body.postanskiBroj,
            interesi: req.body.interesi,
            slika: putanja,

            trgovina : {
                nazivFirme  : req.body.nazivFirme,
                telefonFirme  : req.body.telefonFirme,
                mailFirme: req.body.mailFirme,
                adresaFirme: req.body.adresaFirme,
                gradFirme: req.body.gradFirme,
                adresePoslovnica: req.body.adresePoslovnica,
                kategorijeUsluga: req.body.kategorijeUsluga
            }
        },
        { new: true}
    )
    if(!korisnik)
        return res.status(500).json({succes: false, message: `Nije moguće urediti korisnik-a!`, bug: `exports.urediKorisnika`})
    res.send(korisnik);
})

exports.dajKorisnika = asyncHandler(async (req,res, next)=>{
    if(!mongoose.isValidObjectId(req.params.id))
        return res.status(400).json({message: `ID korisnika ne postoji`})
    const korisnik = await Korisnik.findById(req.params.id).select('-passwordHash');
    // triky https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
    // const { ime, ...others } = korisnik._doc;

    if(!korisnik)
        res.status(500).json({message: `Korisnik sa ID-om ${req.params.id} ne postoji!.`, bug: `exports.dajKorisnika`});
    req.korisnik = korisnik;
    next();
})

exports.dajTrenutnogKorisnika = asyncHandler(async (req,res, next) => {
    let id = res.locals.userId;
    const korisnik = await Korisnik.findById( id ).select('-passwordHash');
    // triky https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
    // const { ime, ...others } = korisnik._doc;
    // console.log(others

    if(!korisnik)
        next();
    req.korisnik = korisnik;
    next();
})

exports.registrujSe = asyncHandler(async (req,res)=>{
    const salt = await bcrypt.genSaltSync(10);
    let pass = await bcrypt.hashSync(req.body.password, salt);

    let picture = req.body.spol === 'M' ? 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp' : 'https://st3.depositphotos.com/1007566/13175/v/600/depositphotos_131750410-stock-illustration-woman-female-avatar-character.jpg'

    let korisnik = new Korisnik({
         nickName: req.body.nickName,
         ime:  req.body.ime,
         prezime :  req.body.prezime,
         mail : req.body.mail,
         passwordHash : pass,
         telefon : req.body.telefon,
         zemlja : req.body.zemlja,
         jelAdmin: req.body.jelAdmin,
         grad : req.body.grad,
         spol : req.body.spol,
        slika: picture,
         ulica : req.body.ulica,
         postanskiBroj : req.body.postanskiBroj,
         interesi: req.body.interesi || null,
        trgovina :(  {
            nazivFirme  : req.body.nazivFirme,
            telefonFirme  : req.body.telefonFirme,
            mailFirme: req.body.mailFirme,
            adresaFirme: req.body.adresaFirme,
            gradFirme: req.body.gradFirme,
            adresePoslovnica: req.body.adresePoslovnica,
            kategorijeUsluga: req.body.kategorijeUsluga
        } )  || null,

    })
    korisnik = await korisnik.save();
    if(!korisnik)
        res.status(400).json({success: false, bug: `exports.registrujSe`});
    res.send(korisnik);
})

exports.logujSe = async (req, res) => {
    const korisnik = await Korisnik.findOne({mail: req.body.mail})
    // const secret = process.env.token_secret;
    const secret = "tajna";
    if (!korisnik)
        return res.status(400).json({message: `Korisnik nije registrovan!.`, bug: `exports.logujSe`});
    else if( korisnik.mail !== req.body.mail)
        res.status(400).json({message: `Pogresan mail!`, bug: `exports.logujSe`});
    if (korisnik && bcrypt.compareSync(req.body.password, korisnik.passwordHash)){
        const token = jwt.sign(
            {korisnikId: korisnik.id, korisnikIme: korisnik.ime, jelAdmin: korisnik.jelAdmin }, //https://jwt.io DEBUGGER,
            secret,
            {expiresIn : '1d'})
         res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000 // 24h
            });

        if (korisnik.jelAdmin && !korisnik.trgovina )
            return res.redirect('/TalaShop/korisnik/getMethodaProfileID');
        return res.redirect('/TalaShop');
        // return res.status(200).send({korisnik: korisnik.ime, token});
    }
    else
        res.status(400).json({message: `Pogresan password!`, bug: `exports.logujSe`});
}
/*
return res.cookie("acces_token", token {
    httpOnly: true,
        secure: secret,
})*/

exports.obrisiKorisnika = async (req, res) => {
    if(!mongoose.isValidObjectId(req.params.id))
        return res.status(400).json({message: `ID korisnik-a ne postoji`});
    let korisnik = await Korisnik.findByIdAndRemove(req.params.id);
    if(korisnik)
        return res.status(200).json({success: true, message: 'Korisnik je obrisan!'});
    return res.status(400).json({success: false , message: 'Korisnik nije obrisan!'});
}


/*
exports.brojKorisnika = async (req, res) => {
    const brojKorisnika = await Korisnik.countDocuments()
    if (!brojKorisnika)
        res.status(500).json({success: false})
    res.send({brojKorisnika: brojKorisnika});
}*/
