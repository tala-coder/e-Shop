const Kategorija = require("../models/kategorija");

exports.dajKategorije = async (req, res) =>{
    const kategorije = await Kategorija.find();
    if(!kategorije) {
        res.status(500).json({success: false, bug: `BUG -> exports.dajKategorije`});
    }
    res.send(kategorije);
}

exports.dajKategoriju = async(req,res)=>{
    const kategorija = await Kategorija.findById(req.params.id);
    if(!kategorija) {
        res.status(500).json({message: `Kategorija sa ID-om ${reg.params.id} ne postoji!. BUG -> exports.dajKategoriju.`})
    }
    res.status(200).send(kategorija);
}

exports.postaviKategoriju = async (req,res)=>{
    let kategorija = new Kategorija({
        naziv: req.body.naziv,
        ikona: req.body.ikona,
        boja: req.body.boja
    })
    kategorija = await kategorija.save();
    if(!kategorija)
        return res.status(400).json({success: false , message:`Kategorija se ne može kreirati! BUG -> exports.postaviKategoriju.`})
    res.send(kategorija);
}

exports.obrisiKetegoriju = (req, res)=>{
    Kategorija.findByIdAndRemove(req.params.id)
        .then(kategorija => {
        if(kategorija) {
            return res.status(200).json({success: true, message: 'Kategorija je obrisana!'})
        } else {
            return res.status(404).json({success: false , message: `Kategorija nije pronađena! BUG -> exports.obrisiKetegoriju.`})
        }
    }).catch(err=>{
        return res.status(500).json({success: false, error: err})
    })
}


