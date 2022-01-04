const Proizvod = require('../models/proizvod');
const mongoose = require("mongoose");

exports.dajProizvode = async (req, res) => { // dajProizvode po selektovanim kategorijama
    let filter = {};
    if(req.query.kategorije)
        filter = {kategorija: req.query.categories.split(",")};

    const proizvodi = await Proizvod.find(filter).populate('kategorija'); // await Proizvod.find().select('naziv opis');.. SELECT PRETRAGA
    if(!proizvodi)
        res.status(500).json({success: false, bug: `exports.dajProizvode`});
    // res.send(proizvodi);
    res.render('proizvod', { title: 'test proizvod' })
}

exports.dajProizvod = async (req, res) =>{
    const proizvod = await Proizvod.findById(req.params.id).populate('kategorija');
    // const proizvod = await Proizvod.findById(req.params.id);
    // console.log(proizvod)
    if(!proizvod) {
        res.status(500).json({success: false, bug: `exports.dajProizvod`})
    }
    res.send(proizvod);
}

exports.dodajProizvod =  async (req, res) =>{
    let proizvod = new Proizvod({
        naziv: req.body.naziv,
        opis: req.body.opis,
        detaljnjiOpis: req.body.detaljnjiOpis,
        brand: req.body.brand,
        cijena: req.body.cijena,
        kategorija: req.body.kategorija,
        tagovi: req.body.tagovi,
        kolicina: req.body.kolicina,
        brojRecenczija: req.body.brojRecenczija,
        recenzija: req.body.recenzija,
        slika: req.body.slika,
        slike: req.body.slike
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
            kategorija: req.body.kategorija,
            tagovi: req.body.tagovi,
            kolicina: req.body.kolicina,
            brojRecenczija: req.body.brojRecenczija,
            recenzija: req.body.recenzija,
            slika: req.body.slika,
            slike: req.body.slike
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
