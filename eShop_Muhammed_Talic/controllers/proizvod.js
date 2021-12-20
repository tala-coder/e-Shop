const Proizvod = require('../models/proizvod');

exports.dajProizvode = async (req, res) =>{
    const proizvodi = await Proizvod.find(); // await Proizvod.find().select('naziv opis');.. SELECT PRETRAGA
    if(!proizvodi) {
        res.status(500).json({success: false, bug: `exports.dajProizvode`})
    }
    res.send(proizvodi);
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

exports.urediProizvod =  async (req, res)=> {
    // if(!mongoose.isValidObjectId(req.params.id)) {
    //     return res.status(400).send('Invalid Product Id') // kasnije
    // }

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
        return res.status(500).jsno({succes: false, message: `Nije moguće urediti proizvod!`, bug: `exports.urediProizvod`})
    res.send(proizvod);
}



