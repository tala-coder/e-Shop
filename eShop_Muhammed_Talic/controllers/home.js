const Kategorija = require("../models/kategorija");

exports.dajPodatkeZaPocetnu = async (req, res) =>{
    const kategorije = await Kategorija.find();
    if(!kategorije) {
        res.status(500).json({success: false, bug: `exports.dajKategorije`});
    }
    // res.send(kategorije);
    res.render('home', { kategorije: kategorije });
    // console.log(kategorije[0].naziv)

}