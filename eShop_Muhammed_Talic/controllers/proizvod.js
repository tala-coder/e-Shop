const Proizvod = require('../models/proizvod');

exports.dajProizvode = async (req, res) =>{
    const proizvodi = await Proizvod.find();
    if(!proizvodi) {
        res.status(500).json({success: false, bug: `exports.dajProizvode`})
    }
    res.send(proizvodi);
}

exports.postaviProizvod =  async (req, res) =>{
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

exports. = 