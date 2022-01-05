const Proizvod = require('../models/proizvod');
const mongoose = require("mongoose");
const asyncHandler = require('express-async-handler')
var moment = require('moment');
moment.locale('bs');


exports.dajProizvode = asyncHandler(async (req, res, next) => { // dajProizvode po selektovanim kategorijama
    let filter = {};
    if(req.query.kategorije)
        filter = {kategorija: req.query.kategorije.split(",")};

    const proizvodi = await Proizvod.find(filter)
        .populate( 'kategorija' , 'naziv')
    // .populate({ path: 'korisnik', select: 'grad', model: Korisnik })

    const gradovi = await Proizvod.find().distinct('grad');

    if(!proizvodi)
        res.status(500).json({success: false, bug: `exports.dajProizvode`});
    req.proizvod = proizvodi;
    req.gradovi = gradovi;
    req.moment = moment;
    // req.proizvod.vrijemeKreiranja = moment(proizvodi.createdAt).endOf('second').fromNow();
    next();
})

exports.dajProizvodeKorisnika = asyncHandler(async (req, res, next) => { // dajProizvode po selektovanim kategorijama

    const proizvodi = await Proizvod.find({korisnik: req.params.id})
    .populate( 'kategorija' , 'naziv')

    if(!proizvodi)
        res.status(500).json({success: false, bug: `exports.dajProizvode`});
    req.proizvod = proizvodi;
    req.moment = moment;
    // req.proizvod.vrijemeKreiranja = moment(proizvodi.createdAt).endOf('second').fromNow();
    next();
})

exports.dajProizvod = async (req, res) =>{
    const proizvod = await Proizvod.findById(req.params.id).populate('kategorija');
    // const proizvod = await Proizvod.findById(req.params.id);
    if(!proizvod) {
        res.status(500).json({success: false, bug: `exports.dajProizvod`})
    }
    next();
    // res.send(proizvod);
}

exports.dodajProizvod =  async (req, res) =>{
    let proizvod = new Proizvod({
        naziv: req.body.naziv,
        opis: req.body.opis,
        detaljnjiOpis: req.body.detaljnjiOpis,
        brand: req.body.brand,
        grad: req.body.grad,
        cijena: req.body.cijena,
        kategorija: req.body.kategorija,
        tagovi: req.body.tagovi,
        kolicina: req.body.kolicina,
        brojRecenczija: req.body.brojRecenczija,
        recenzija: req.body.recenzija,
        slika: req.body.slika,
        istaknut: req.body.istaknut,
        akcija: req.body.akcija,
        besplatnaDostava: req.body.besplatnaDostava,
        brojOtvaranja: req.body.brojOtvaranja,
        slike: req.body.slike,
        korisnik: req.body.korisnik
    })
    proizvod = await proizvod.save();
    if(!proizvod)
        return res.status(500).json({success: false, message: `Nije moguće postaviti proizvod!`, bug: `exports.postaviProizvod`});
    res.send(proizvod);
}

exports.urediProizvod =  async (req, res)=> {
    if(!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({message: `ID proizvoda ne postoji`})
    }
    const proizvod = await Proizvod.findByIdAndUpdate(req.params.id,
        {
            naziv: req.body.naziv,
            opis: req.body.opis,
            detaljnjiOpis: req.body.detaljnjiOpis,
            brand: req.body.brand,
            cijena: req.body.cijena,
            grad: req.body.grad,
            kategorija: req.body.kategorija,
            tagovi: req.body.tagovi,
            kolicina: req.body.kolicina,
            brojRecenczija: req.body.brojRecenczija,
            recenzija: req.body.recenzija,
            slika: req.body.slika,
            istaknut: req.body.istaknut,
            akcija: req.body.akcija,
            besplatnaDostava: req.body.besplatnaDostava,
            brojOtvaranja: req.body.brojOtvaranja,
            slike: req.body.slike,
            korisnik: req.body.korisnik
        },
        { new: true}
    )
    if(!proizvod)
        return res.status(500).json({succes: false, message: `Nije moguće urediti proizvod!`, bug: `exports.urediProizvod`})
    res.send(proizvod);
}

exports.obrisiProizvod =  async (req, res)=> {
    if(!mongoose.isValidObjectId(req.params.id))
        return res.status(400).json({message: `ID proizvoda ne postoji`});
    let proizvod = await Proizvod.findByIdAndRemove(req.params.id);
    if(proizvod)
        return res.status(200).json({success: true, message: 'Proizvod je obrisan!'});
    return res.status(400).json({success: false , message: "Proizvod nije obrisan!"});
}

exports.brojProizvoda = async (req, res) =>{
    const brojProizvoda = await Proizvod.countDocuments();
    if(!brojProizvoda)
        res.status(500).json({success: false});
    res.json({brojProizvoda: brojProizvoda});
}

exports.dajIzdvojeneProizvode = async (req, res) =>{
    const count = req.params.broj ? req.params.broj : 0
    const proizvodi = await Proizvod.find({isFeatured: true}).limit(+count);
    if(!proizvodi)
        res.status(500).json({success: false});
    res.send(proizvodi);
}

// exports. =
