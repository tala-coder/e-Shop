const { Narudzba } = require('../models/narudzba');
const { OrderItem } = require('../models/OrderItem');

exports.dajNarudzbe = async (req, res) =>{
    const narudzbe = await Narudzba.find().populate('korisnik', 'imePrezime').sort('narudzbaTime'); // .sort({'narudzbaTime'} : -1); -> https://mongoosejs.com/docs/api/query.html#query_Query-sort
    /*.populate({
          path: 'orderItems', populate: {
            path : 'proizvod', populate: 'kategorija'}
        })*/
    if(!narudzbe)
        res.status(500).json({success: false});
    res.send(narudzbe);
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

exports.postaviNarudzbu = async (req,res)=>{
    const orderItemsIds = Promise.all(req.body.orderItems.map(async (orderItem) =>{
        let newOrderItem = new OrderItem({
            kolicina: orderItem.kolicina,
            proizvod: orderItem.proizvod
        })
        newOrderItem = await newOrderItem.save();
        return newOrderItem._id;  // spasavamo u bazu nizove
    }))
    const orderItemsIdsResolved =  await orderItemsIds;

    const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId)=>{
        const orderItem = await OrderItem.findById(orderItemId).populate('proizvod', 'cijena');
        return orderItem.proizvod.cijena * orderItem.kolicina
    }))

    const totalPrice = totalPrices.reduce((a,b) => a + b , 0);

    let narudzba = new Narudzba({
        orderItems: orderItemsIdsResolved,
        // orderItems: orderItemsIds,
        adresa1: req.body.adresa1,
        adresa2: req.body.adresa2,
        grad: req.body.grad,
        postanskiBroj: req.body.postanskiBroj,
        zemlja: req.body.zemlja,
        telefon: req.body.telefon,
        status: req.body.status,
        totalPrice: totalPrice,
        korisnik: req.body.korisnik,
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
