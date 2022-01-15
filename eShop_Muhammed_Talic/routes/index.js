var express = require('express');
var router = express.Router();
const auth = require("../helpers/authMiddleware");
const kategorija = require("../controllers/kategorija");
const proizvod = require("../controllers/proizvod");



// update dodaj vise slika
// router.post('/profile2', upload.array('avatar', 10), async (req, res)=> {
//         // if(!mongoose.isValidObjectId(req.params.id)) {
//         //     return res.status(400).send('Invalid Product Id')
//         // }
//         let slike = [];
//         const putanja = `${req.protocol}://${req.get('host')}/public/images/`
//
//         if(req.files) {
//             req.files.map(file =>{
//                 slike.push(`${putanja}${file.filename}`);
//             })
//         }
//
//         const proizvod = await Proizvod.findByIdAndUpdate(
//             '61df88ec49d43cf3d1bdecd1',
//             {
//                 slike: slike
//             },
//             { new: true}
//         )
//
//         if(!proizvod)
//             return res.status(500).send('Slike nisu dodane!')
//
//         res.send(proizvod);    }
// )






router.get('/', kategorija.dajKategorije, proizvod.dajProizvode,
    function(req, res) {
        res.render('home', {kategorije: req.kategorije, proizvod: req.proizvod, moment: req.moment, gradovi: req.gradovi})
});

router.get('/logout', function(req, res) {
  res.cookie('jwt', '', {maxAge: 1});
  res.redirect('/TalaShop');
});




// router.get('/test',
//     auth.requireAuth, (req, res) =>
//   res.render('narudzba', { title: 'test jwt cookie' }));

/*
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

router.get('/registerTrgovina', function(req, res, next) {
  res.render('registerTrgovina', { title: 'Express' });
});*/

module.exports = router;
