// const  Narudzba   = require('../models/narudzba');
// const  OrderItem   = require('../models/OrderItem');


exports.dajNarudzbe = async (req, res, next) =>{ // .sort({'narudzbaTime'} : -1); -> https://mongoosejs.com/docs/api/query.html#query_Query-sort
// .populate({path: 'korisnik', select: 'nickName zemlja', model: Korisnik }).sort('createdAt')

    const narudzbe = await Narudzba.find({})
        .populate('korisnik' )
        .populate({path : 'orderItems', populate: 'proizvod'})

    console.log("OVDJE", narudzbe)
    if(!narudzbe)
        res.status(500).json({success: false});
    req.narudzbe = narudzbe;
    res.send(narudzbe)
    // next();
}

exports.dajNarudzbu = async (req, res) =>{
    const narudzbe = await Narudzba.findById(req.params.id)
        .populate('korisnik', 'imePrezime')
        .populate({
            path: 'orderItems', populate: {
                path : 'proizvod', populate: 'kategorija'}
        });
    if(!narudzbe)
        res.status(500).json({success: false});
    res.send(narudzbe);
}

const  OrderItem   = require('../models/OrderItem');
const Kategorija   = require("../models/kategorija"); // Cudan bug ? constructor

// ovo je funkcija promijeni status 'Čeka se odobrenje trgovca', napraviti funkciju posalji
exports.postaviNarudzbu = async (req,res, next)=>{
    const korpa = await OrderItem.find({korisnik: res.locals.userId})

     await Promise.all(korpa.map(async (orderItem) => {
         console.log(orderItem._id, 'ovdje')  // upit vraca mi id kupca od proizvoda
          await OrderItem.findByIdAndUpdate(orderItem._id, {status: 'Čeka se odobrenje trgovca'}, {new: true}); // req.body.status
     }))

    // next();
    res.sendStatus(200);
    // let narudzba = new Narudzba({
    //     adresa1: req.body.adresa1,
    //     adresa2: req.body.adresa2,
    //     grad: req.body.grad,
    //     postanskiBroj: req.body.postanskiBroj,
    //     zemlja: req.body.zemlja,
    //     telefon: req.body.telefon,
    //     cijena: req.body.cijena, // pokusat iz baze izvuc konacnu cijenu
    // })
    // narudzba = await narudzba.save();
    //
    // if(!narudzba)
    //     return res.status(400).send('Narudzba nije kreirana!')
    // res.send(narudzba);
}

exports.dodajNarudzbu = async (req, res, next) => {
    let korpa = new OrderItem({
        korisnik: req.body.korisnik,
        trgovac:  req.body.trgovac,
        stanje:     req.body.stanje,
        proizvod: req.body.proizvod,
        kolicina: req.body.kolicina || 1,
        adresa1: req.body.adresa1,
        adresa2: req.body.adresa2,
        poruka: req.body.poruka,
        grad: req.body.grad,
        postanskiBroj: req.body.postanskiBroj,
        zemlja: req.body.zemlja,
        telefon: req.body.telefon,
        status: req.body.status || 'Narudžba je u korpi' // ceka se odobrenje ?
    })
     const { ime, ...others } = korpa._doc;
    console.log(others,  'others');
    korpa = await korpa.save();

    if(!korpa)
        return res.status(400).json({success: false , message:`korpa se ne može kreirati!`, bug:`exports.dodajNarudzbu.`})
    res.send(korpa);
}

exports.obrisiNarudzbu = (req, res)=>{
    Narudzba.findByIdAndRemove(req.params.id).then(async narudzba =>{
        if(narudzba) {
            narudzba.orderItems.map(async orderItem => {
                await OrderItem.findByIdAndRemove(orderItem)
            })
            return res.status(200).json({success: true, message: 'Narudzba je obrisana!'})
        } else {
            return res.status(404).json({success: false , message: "Narudzba ne postoji!"})
        }
    }).catch(err=>{
        return res.status(500).json({success: false, error: err})
    })
}

exports.PromijeniStatusNarudzbe = async (req, res)=> {
    const narudzba = await Narudzba.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status
        },
        { new: true}
    )
    if(!narudzba)
        return res.status(400).send('Nije moguće urediti narudzbu!')
    res.send(narudzba);
}



/*
    KORPA
*/
exports.dajKorpu = async (req, res, next) =>{
    const korpa = await OrderItem.find({korisnik: res.locals.userId, status: 'Narudžba je u korpi'})
        .populate({path : 'proizvod', select: 'kolicina slika cijena opis', model: Proizvod} )
    if(!korpa)
        res.status(500).json({success: false});
    req.korpa = korpa;
    next();
}

