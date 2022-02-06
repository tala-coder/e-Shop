 const sGmail = require('@sendgrid/mail')
 const API_KEY = process.env.SENDGRID_API_KEY;

sGmail.setApiKey(API_KEY);

const message = {
    to: 'fajkesejdic@gmail.com',
    from: 'muhammedtalic.it@gmail.com',
    subject: 'subject..',
    text: 'text neki,,, ',
    html: ' <h1>Naslov neki</h1> ',
}







const  OrderItem   = require('../models/OrderItem');
//const Kategorija   = require("../models/kategorija"); // Cudan bug ? constructor


exports.PromijeniStatusNarudzbe = async (req,res, next)=>{
    const korpa = await OrderItem.find({korisnik: res.locals.userId, status:'Narudžba je u korpi'}) // potencijalni bug

    let data = req.body;

    if (req.query.status === 'Odobreno') {
        await Promise.all(data.map(async (id) => {
            console.log('nesto')
            await OrderItem.findByIdAndUpdate(id, {status: 'Odobreno'}, {new: true}); // req.body.status
        }))
    }
    else if (req.query.status === 'Odbijeno') {
        await Promise.all(data.map(async (id) => {
            await OrderItem.findByIdAndUpdate(id, {status: 'Odbijeno'}, {new: true}); // req.body.status
        }))
    }
    else if (req.query.status === 'Obrisano') {
        await Promise.all(data.map(async (id) => {
            await OrderItem.findByIdAndUpdate(id, {status: 'Obrisano'}, {new: true}); // req.body.status
        }))
    }
    else  {
        console.log(korpa)
        await Promise.all(korpa.map(async (orderItem) => {
            await OrderItem.findByIdAndUpdate(orderItem._id, {status: 'Čeka se odobrenje trgovca'}, {new: true}); // req.body.status
        }))
    }


    // next();
    // res.sendStatus(200);
    res.redirect('/TalaShop/narudzba/korpa');
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
        stanje:   req.body.stanje,
        proizvod: req.body.proizvod,
        kolicina: req.body.kolicina || 1,
        adresa1: req.body.adresa1,
        adresa2: req.body.adresa2,
        poruka: req.body.poruka,
        grad: req.body.grad,
        postanskiBroj: req.body.postanskiBroj,
        cijenaProizvoda: req.body.cijenaProizvoda,
        zemlja: req.body.zemlja,
        telefon: req.body.telefon,
        status: req.body.status || 'Narudžba je u korpi'
    })
    korpa = await korpa.save();
    await sGmail.send(message);

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
    // Narudzba.findByIdAndRemove(req.params.id).then(async narudzba =>{
    //     if(narudzba) {
    //         narudzba.orderItems.map(async orderItem => {
    //             await OrderItem.findByIdAndRemove(orderItem)
    //         })
    //         return res.status(200).json({success: true, message: 'Narudzba je obrisana!'})
    //     } else {
    //         return res.status(404).json({success: false , message: "Narudzba ne postoji!"})
    //     }
    // }).catch(err=>{
    //     return res.status(500).json({success: false, error: err})
    // })
}

// exports.PromijeniStatusNarudzbe = async (req, res)=> {
//     const narudzba = await Narudzba.findByIdAndUpdate(
//         req.params.id,
//         {
//             status: req.body.status
//         },
//         { new: true}
//     )
//     if(!narudzba)
//         return res.status(400).send('Nije moguće urediti narudzbu!')
//     res.send(narudzba);
// }

exports.dajNarudzbe = async (req, res, next) =>{
    const korpa = await OrderItem.find({korisnik: res.locals.userId, status: 'Narudžba je u korpi'})
        .populate({path : 'proizvod', select: 'naziv kolicina slika cijena opis', model: Proizvod} );
    const poslano = await OrderItem.find({trgovac: res.locals.userId, status: 'Čeka se odobrenje trgovca'})
        .populate({path : 'proizvod', select: 'naziv kolicina slika cijena opis', model: Proizvod} );
    const odobreno = await OrderItem.find({trgovac: res.locals.userId, status: 'Odobreno'})
        .populate({path : 'proizvod', select: 'naziv kolicina slika cijena opis', model: Proizvod} );
    const odbijeno = await OrderItem.find({trgovac: res.locals.userId, status: 'Odbijeno'})
        .populate({path : 'proizvod', select: 'naziv kolicina slika cijena opis', model: Proizvod} );


    const poslano_kupac = await OrderItem.find({korisnik: res.locals.userId, status: 'Čeka se odobrenje trgovca'})
        .populate({path : 'proizvod', select: 'naziv kolicina slika cijena opis', model: Proizvod} );
    const odobreno_kupac = await OrderItem.find({korisnik: res.locals.userId, status: 'Odobreno'})
        .populate({path : 'proizvod', select: 'naziv kolicina slika cijena opis', model: Proizvod} );
    const odbijeno_kupac = await OrderItem.find({korisnik: res.locals.userId, status: 'Odbijeno'})
        .populate({path : 'proizvod', select: 'naziv kolicina slika cijena opis', model: Proizvod} );



    if(!korpa)
        res.status(500).json({success: false});
    req.korpa = korpa;
    req.poslano = poslano;
    req.odobreno = odobreno;
    req.odbijeno = odbijeno;

    req.poslano_kupac = poslano_kupac;
    req.odobreno_kupac = odobreno_kupac;
    req.odbijeno_kupac = odbijeno_kupac;
    next();
}

