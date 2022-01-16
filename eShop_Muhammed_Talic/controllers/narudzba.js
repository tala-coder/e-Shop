const  Narudzba   = require('../models/narudzba');
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
const Kategorija = require("../models/kategorija"); // Cudan bug ? constructor
exports.postaviNarudzbu = async (req,res)=>{
    const orderItemsIds = Promise.all(req.body.orderItems.map(async (orderItem) =>{
        let newOrderItem = new OrderItem({
            korisnik: orderItem.korisnik,
            kolicina: orderItem.kolicina , // || 1,
            proizvod: orderItem.proizvod
        })
        newOrderItem = await newOrderItem.save();
        return newOrderItem._id;  // spasavamo u bazu nizove
    }))
    const orderItemsIdsResolved =  await orderItemsIds;
    // const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId)=>{
    //     const orderItem = await OrderItem.findById(orderItemId).populate({path: 'proizvod', select: 'cijena', model: Proizvod });
    //     return orderItem.proizvod.cijena * orderItem.kolicina
    // }))
    //
    // const totalPrice = totalPrices.reduce((a,b) => a + b , 0);

    let narudzba = new Narudzba({
        orderItems: orderItemsIdsResolved,
        adresa1: req.body.adresa1,
        adresa2: req.body.adresa2,
        grad: req.body.grad,
        postanskiBroj: req.body.postanskiBroj,
        zemlja: req.body.zemlja,
        telefon: req.body.telefon,
        status: req.body.status,
        totalPrice: 100, // req.body.cijena
        korisnik: req.body.korisnik,
        trgovac: req.body.trgovac,
    })
    narudzba = await narudzba.save();

    if(!narudzba)
        return res.status(400).send('Narudzba nije kreirana!')
    res.send(narudzba);
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
    const korpa = await OrderItem.find({korisnik: res.locals.userId})
        .populate({path : 'proizvod', select: 'kolicina slika cijena opis', model: Proizvod} )
    if(!korpa)
        res.status(500).json({success: false});
    req.korpa = korpa;
    next();
}

exports.dodajuKorpu = async (req, res, next) => {
    let korpa = new OrderItem({
        korisnik: req.body.korisnik,
        proizvod: req.body.proizvod,
        kolicina: req.body.kolicina || 1,
    })
    console.log(korpa)

    korpa = await korpa.save();
    if(!korpa)
        return res.status(400).json({success: false , message:`korpa se ne može kreirati!`, bug:`exports.dodajuKorpu.`})
    res.send(korpa);
}