var express = require('express');
var router = express.Router();
const kategorija = require("../controllers/kategorija");
const proizvod = require("../controllers/proizvod");
const korisnik = require("../controllers/korisnik");


router.get('/', kategorija.dajKategorije, proizvod.dajProizvode, korisnik.dajTrenutnogKorisnika,
    function(req, res) {
        res.render('home', {kategorije: req.kategorije, korisnik: req.korisnik, proizvod: req.proizvod, moment: req.moment, gradovi: req.gradovi})
});

router.get('/test', kategorija.dajKategorije, proizvod.dajIzdvojeneProizvode,
    function(req, res) {
        res.render('home', {kategorije: req.kategorije, proizvod: req.proizvod, moment: req.moment, gradovi: req.gradovi})
});


let io = null;


const {generateMessage, generateLocation, dodajUsera, removeUser, getUser} = require('../helpers/soketi')
router.get('/inbox', function(req, res) {
    if (!io){
        io = require('socket.io')(req.connection.server);
        io.sockets.on('connection', (socket) => {
            var room = 'pmf';

            socket.on('join',  ({username, room}) => {
                dodajUsera({id: socket.id, username, room});
                socket.join(room);
                // console.log(user, 'dodaj usera')

                socket.emit('poruka', generateMessage('TalaShop admin', 'Dobro došli!'));
                // socket.broadcast.emit('poruka', generateMessage('TalaShop admin',`${username} se priključio razgovoru!`));
                socket.broadcast.to(room).emit('poruka', generateMessage('TalaShop admin', `${username} se priključio razgovoru!`));

                // socket.emit, io.emit,    socket.broadcast.emit
                //            , io.to.emit, socket.broadcast.to.emit
            })
            // socket.emit('poruka', generateMessage('Dobro došli na chat TalaShop'));
            // socket.broadcast.emit('poruka', generateMessage('Chatu se pridruzila nova osoba'));

            socket.on('posaljiPoruku', (msg) => {
                const user = getUser(socket.id)
                console.log(user, 'daj usera')
                // io.emit('poruka', generateMessage(user.username, msg))
                io.to(room).emit('poruka', generateMessage(user.username, msg))
            })

            socket.on('sendLocation',  (coords) => {
                const user =  getUser(socket.id);
                let lokacija = `https://google.com/maps?q=${coords.latitude},${coords.longitude}`;
                io.to(room).emit('locationMessage', generateLocation(user.username, lokacija))
                // io.emit('locationMessage', ( `https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
            })

            socket.on('disconnect', () => {
                const user = removeUser(socket.id);
                // console.log(user, 'diskonekt user')

                if (user) {
                    io.to(room).emit('poruka', generateMessage('TalaShop admin',`${user.username} je napustio razgovor!`))
                    // io.emit('poruka', generateMessage('TalaShop admin',`${user.username} je napustio razgovor!`))
                }
                // io.emit('poruka', generateMessage(`${user.username} je napustio razgovor!`))
            })
        })
    }
    res.render('soketi/PMF_room_CHAT')
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
