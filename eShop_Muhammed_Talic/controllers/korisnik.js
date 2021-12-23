const {Korisnik} = require('../models/korisnik');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const Proizvod = require("../models/proizvod");

exports.dajKorisnike = async (req, res) =>{
    const korisnici = await Korisnik.find().select('-passwordHash');
    if(!korisnici) {
        res.status(500).json({success: false})
    }
    res.send(korisnici);
}

exports.dajKorisnika = async(req,res)=>{
    const korisnik = await Korisnik.findById(req.params.id).select('-passwordHash');
    if(!korisnik)
        res.status(500).json({message: `Korisnik sa ID-om ${req.params.id} ne postoji!.`, bug: `exports.dajKorisnika`});
    res.status(200).send(korisnik);
}

exports.registrujSe = async (req,res)=>{
    const salt = await bcrypt.genSaltSync(10);
    let korisnik = new Korisnik({
         ime:  req.body.ime,
         prezime :  req.body.prezime,
         mail : req.body.mail,
         passwordHash : bcrypt.hashSync(req.body.password, salt),
         telefon : req.body.telefon,
         zemlja : req.body.zemlja,
         jelAdmin: req.body.jelAdmin,
         grad : req.body.grad,
         ulica : req.body.ulica,
         postanskiBroj : req.body.postanskiBroj,
         interesi: req.body.interesi,
         trgovina: req.body.trgovina

    })
    korisnik = await korisnik.save();
    console.log(req.body.trgovina);
    if(!korisnik)
        res.status(400).json({success: false, bug: `exports.registrujSe`});
    res.send(korisnik);
}

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
            {
                korisnikId: korisnik.id,
                jelAdmin: korisnik.jelAdmin  //https://jwt.io DEBUGGER
            },
            secret,
            {expiresIn : '2d'}
        )
        return res.status(200).send({korisnik: korisnik.nickName, token});
    }
    else
        res.status(400).json({message: `Pogresan password!`, bug: `exports.logujSe`});
}

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
