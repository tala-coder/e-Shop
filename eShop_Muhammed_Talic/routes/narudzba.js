const  narudzba   = require('../controllers/narudzba');
 const express = require('express');
const router = express.Router();


/*  KORPA   */
router.get(`/korpa`, narudzba.dajKorpu, function(req, res) {
    res.render('korpa',  { korpa: req.korpa , title: 'Korpa', popust: '-50%', dostava: '7'});
})

router.post('/korpa', narudzba.dodajuKorpu)





/*  NARUDZBE    */
router.get(`/`, narudzba.dajNarudzbe)
/*
function(req, res) {
    // console.log(req.narudzbe);
    res.render('narudzba',  { narudzba: req.narudzbe , title: 'Narudžbe'});
})
*/

router.get(`/:id`, narudzba.dajNarudzbu)

router.post('/', narudzba.postaviNarudzbu)
router.delete('/:id', narudzba.obrisiNarudzbu)
router.put('/:id', narudzba.PromijeniStatusNarudzbe);

router.get(`/get/userorders/:userid`, async (req, res) =>{
    const userOrderList = await Order.find({user: req.params.userid}).populate({
        path: 'orderItems', populate: {
            path : 'product', populate: 'category'}
    }).sort({'dateOrdered': -1});

    if(!userOrderList) {
        res.status(500).json({success: false})
    }
    res.send(userOrderList);
})

module.exports = router;
