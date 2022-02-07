const Korisnik = require('../models/korisnik');
const Poruka = require('../models/Poruke');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const asyncHandler = require('express-async-handler')
const multer  = require('multer');
const { storage } = require('../helpers/multer');
const RecenzijaTrgovac = require("../models/recenzije_korisnik");
const upload = multer({ storage: storage })
exports.uploadSingle = upload.single('avatar');
const moment = require('moment');
moment.locale('bs');

/*const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
client.messages
    .create({
        body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
        from: '+19106295923',
        to: '+38762047721'
    })
    .then(message => console.log(message.sid));*/

exports.logujSeForma = asyncHandler(async function(req, res) {
    res.render('login', { title: 'Login' , greska: ''});
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

exports.statistika = asyncHandler(async (req, res, next) =>{
    const status = await Korisnik.aggregate([
        {$group : {_id:"$status", count:{$sum:1}}}
    ]);
    if(!status) {
        res.status(500).json({success: false})
    }

    const zemlja = await Korisnik.aggregate([
        {$group : {_id:"$zemlja", count:{$sum:1}}}
    ]);
    if(!zemlja)
        res.status(500).json({success: false})
    req.status = status;


    const spol = await Korisnik.aggregate([
        {$group : {_id:"$spol", count:{$sum:1}}}
    ]);
    if(!spol) {
        res.status(500).json({success: false})
    }
    req.spol = spol;
    next();
})

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
    res.redirect(`/TalaShop/korisnik/${korisnik._id}`);
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

exports.dodajKomentar =  asyncHandler(async (req, res) =>{
    let recenzija = new RecenzijaTrgovac({
        korisnik: req.body.korisnik,
        trgovac: req.body.trgovac,
        rating: req.body.rating,
        komentar: req.body.komentar
    })
    recenzija = await recenzija.save();
    if(!recenzija)
        return res.status(500).json({success: false, message: `Nije moguće postaviti recenziju!`, bug: `exports.postaviKomentarTrgovac`});
    // res.send(recenzija);
})

exports.dajKomentare = asyncHandler(async (req,res, next)=>{
    if(!mongoose.isValidObjectId(req.params.id))
        return res.status(400).json({message: `ID korisnika ne postoji`})
    const recenzija = await RecenzijaTrgovac.find({trgovac: req.params.id})
        .populate({ path: 'korisnik', select: '_id slika nickName ime prezime', model: Korisnik })

    if(!recenzija)
        res.status(500).json({  bug: `exports.dajkomentartrgovac`});
    req.recenzija = recenzija;
    next();
})

exports.dajTrenutnogKorisnika = asyncHandler(async (req,res, next) => {
    let id = res.locals.userId;
    const korisnik = await Korisnik.findById( id ).select('-passwordHash');

    if(!korisnik)
        return next();
    req.korisnik = korisnik;
    next();
})

exports.registrujSe = asyncHandler(async (req,res)=>{
    const salt = await bcrypt.genSaltSync(10);
    let pass = await bcrypt.hashSync(req.body.password, salt);

    let picture = req.body.spol === 'Muško' ? 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp' : 'https://st3.depositphotos.com/1007566/13175/v/600/depositphotos_131750410-stock-illustration-woman-female-avatar-character.jpg'

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
    res.redirect(`/TalaShop/korisnik/login`);
})

exports.logujSe = async (req, res) => {
    const korisnik = await Korisnik.findOne({mail: req.body.mail})
    const secret = "tajna";
    if (!korisnik)
        return res.render('login', { title: 'Login', greska: 'Korisnik nije registrovan!' });

    else if( korisnik.mail !== req.body.mail)
        return res.render('login', { title: 'Login', greska: 'Unijeli ste pogrešne podatke!' });

    else if( korisnik.status === 'blokiran' )
        return res.render('login/blokiranDo', { blokiranDo:(korisnik.blokiranDo), moment: req.moment = moment  });


    if (korisnik && bcrypt.compareSync(req.body.password, korisnik.passwordHash)){
        const token = jwt.sign(
            {korisnikId: korisnik.id, korisnikSlika: korisnik.slika, korisnikIme: korisnik.ime,
                korisnikStatus: korisnik.status,
                korisnikNickname: korisnik.nickName, jelAdmin: korisnik.jelAdmin }, //https://jwt.io DEBUGGER,
            secret,
            {expiresIn : '1d'})
         res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000 // 24h
            });

        if (korisnik.jelAdmin && korisnik.trgovina.nazivFirme === '' )
            return res.redirect(`/TalaShop/korisnik/urediProfil/${korisnik._id}`);
        else if ( korisnik.jelAdmin )
            return res.redirect(`/TalaShop/korisnik/${korisnik._id}`);
        else if ( korisnik.adminSistema )
            return res.redirect(`/TalaShop/korisnik/headadmin?status=Lista%20korisnika`);
        return res.redirect(`/TalaShop`);
    }
    else
        return res.render('login', { title: 'Login', greska: 'Unijeli ste pogrešne podatke!' });
}

exports.obrisiKorisnika = async (req, res) => {
    if(!mongoose.isValidObjectId(req.params.id))
        return res.status(400).json({message: `ID korisnik-a ne postoji`});
    let korisnik = await Korisnik.findByIdAndRemove(req.params.id);
    if(korisnik)
        return res.status(200).json({success: true, message: 'Korisnik je obrisan!'});
    return res.status(400).json({success: false , message: 'Korisnik nije obrisan!'});
}

exports.promeniStatus = async (req, res)=> {
    let blokiranDo = null;
    if (req.body.status === 'blokiran')
        blokiranDo = new Date(Date.now() + (3600 * 1000 * 24 * 15));

    const korisnik = await Korisnik.findByIdAndUpdate(req.params.id,
        {
            status: req.body.status,
            blokiranDo: blokiranDo,
        },
        { new: true}
    )
    if(!korisnik)
        return res.status(500).json({succes: false, message: `Nije moguće urediti korisnik-a!`, bug: `exports.urediKorisnika`})
    res.send(korisnik);
}


/* PORUKA */
exports.dodajPoruku = async (req, res, next) => {
    const msg = await Poruka.findOne({soba: req.body.room} ).select();
    // ako ne postoj soba kreiraj je.
    if (!msg) {
    let poruka = new Poruka({
        kupac: req.body.kupac,
        trgovac:  req.body.trgovac,
        soba:   req.body.room
    })
    poruka = await poruka.save();
    if(!poruka){
        return res.status(400).json({success: false , message:`poruka se ne može kreirati!`, bug:`exports.dodajPoruku.`})}
        next();
    }
    // res.send(poruka);
    else{
        next();
    }
}

exports.dajKorisnikeZaChat = async (req, res, next) =>{
    const korisnici = await Poruka.find( {trgovac: res.locals.nickname}) // ovdje bug
    if(!korisnici) {
        res.status(500).json({success: false})
    }
    req.korisnici = korisnici;
    next();
}