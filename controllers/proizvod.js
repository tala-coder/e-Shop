const Proizvod = require('../models/proizvod');
const mongoose = require("mongoose");
const asyncHandler = require('express-async-handler')
const moment = require('moment');
moment.locale('bs');
const multer  = require('multer');
const { storage } = require('../helpers/multer');
const upload = multer({ storage: storage })
exports.uploadArray = upload.array('avatar', 10);


exports.dajProizvode = asyncHandler(async (req, res, next) => {
    let filter_kategorije = {};
    let filter_grad = {};
    if(req.query.kategorije)
        filter_kategorije = {kategorija: req.query.kategorije.split(",")};
    if (req.query.grad)
        filter_grad = {grad: req.query.grad};

    // console.log(req.body, 'ovdje sam')
    // SEARCH:    https://stackoverflow.com/questions/29648626/moongose-mongodb-like-operator-in-search
    var naziv = '';
    console.log(req.query)
    if (req.query.naziv)
        naziv = req.query.naziv
    console.log(naziv)

    var toSearch = naziv.split(" ").map(function(n) {
        return {
            naziv: new RegExp(n.trim(), 'i')
        };
    });
    /*const search = await Proizvod.find({ $and: [toSearch[0]] });
    console.log('search', search )
    console.log('kategorije', filter_kategorije )
    const proizvodi = await Proizvod.find(filter_kategorije, )
    const proizvodi = await Proizvod.find({$and:[filter_grad, filter_kategorije]  } )*/

    const proizvodi = await Proizvod.find({$and:  [filter_grad, filter_kategorije, toSearch[0]]    } )
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
    req.moment = moment;  // req.proizvod.vrijemeKreiranja = moment(proizvodi.createdAt).endOf('second').fromNow();
    next();
})

exports.dajProizvod = async (req, res, next) =>{
    const proizvod = await Proizvod.findById(req.params.id)
         .populate({ path: 'korisnik', select: '_id nickName zemlja ulica telefon grad postanskiBroj ime', model: Korisnik })
         .populate({ path: 'kategorija', select: 'naziv', model: Kategorija });
    if(!proizvod)
        res.status(500).json({success: false, bug: `exports.dajProizvod`})

    req.proizvod = proizvod;
    req.moment = moment;
    next();
}

exports.urediProizvod =  asyncHandler(  async (req, res)=> {
    if(!mongoose.isValidObjectId(req.params.id))
        return res.status(400).json({message: `ID proizvoda ne postoji`})
    // console.log("ovdje smo")
    // console.log(req.body);
    // console.log(req.params);
    // console.log(req.protocol);
    let slike = [];
    const putanja = `${req.protocol}://${req.get('host')}/public/images/`;

    if(req.files) {
        req.files.map(file =>{
            slike.push(`${putanja}${file.filename}`);
        })
    }
    let naslovna = slike[0];

    let proizvod = await Proizvod.findByIdAndUpdate(req.params.id,
        {
            slika: naslovna,
            slike: slike,
            $set: req.body
        },
        { new: true}
    )
    if(!proizvod)
        return res.status(500).json({succes: false, message: `Nije moguće urediti proizvod!`, bug: `exports.urediProizvod`})
    res.send(proizvod);
})


exports.dodajProizvod =  asyncHandler(async (req, res) =>{
    let slike = [];
    const putanja = `${req.protocol}://${req.get('host')}/public/images/`;

    if(req.files) {
        req.files.map(file =>{
            slike.push(`${putanja}${file.filename}`);
        })
    }
    let naslovna = slike[0];

    let proizvod = new Proizvod({
        naziv: req.body.naziv,
        opis: req.body.opis,
        stanje: req.body.stanje,
        detaljnjiOpis: req.body.detaljnjiOpis,
        brand: req.body.brand,
        boja: req.body.boja,
        grad: req.body.grad,
        cijena: req.body.cijena,
        kategorija: req.body.kategorija,
        tagovi: req.body.tagovi,
        kolicina: req.body.kolicina,
        brojRecenczija: req.body.brojRecenczija,
        recenzija: req.body.recenzija,
        slika: naslovna,
        istaknut: req.body.istaknut,
        akcija: req.body.akcija,
        besplatnaDostava: req.body.besplatnaDostava,
        brojOtvaranja: req.body.brojOtvaranja,
        slike: slike,
        korisnik: res.locals.userId
    })
    proizvod = await proizvod.save();
    if(!proizvod)
        return res.status(500).json({success: false, message: `Nije moguće postaviti proizvod!`, bug: `exports.postaviProizvod`});
    res.send(proizvod);
})



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

exports.dajIzdvojeneProizvode = async (req, res, next) =>{
    const count = req.params.broj ? req.params.broj : 0
    const proizvodi = await Proizvod.find({istaknut: true}).limit(+count)
        .populate( 'kategorija' , 'naziv');
    // .populate({ path: 'korisnik', select: 'grad', model: Korisnik })

    const gradovi = await Proizvod.find().distinct('grad');

    if(!proizvodi)
        res.status(500).json({success: false, bug: `exports.dajProizvode`});
    req.proizvod = proizvodi;
    req.gradovi = gradovi;
    req.moment = moment;
    // req.proizvod.vrijemeKreiranja = moment(proizvodi.createdAt).endOf('second').fromNow();
    next();
}
