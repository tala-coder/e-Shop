var express = require('express');
var router = express.Router();
var io = null;
const {generateMessage} = require('../helpers/soketi')


router.get('/',
      function(req, res) {
    if (!io){
        io = require('socket.io')(req.socket.server);
        io.sockets.on('connection', (socket) => {
            socket.emit('poruka', generateMessage('Dobro došli na chat TalaShop'));

            socket.broadcast.emit('poruka', generateMessage('Chatu se pridruzila nova osoba'));

            socket.on('posaljiPoruku', (msg) => {
                io.emit('poruka', generateMessage(msg))
            })

            socket.on('sendLocation', (coords) => {
                io.emit('locationMessage', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
                // callback()
            })

            socket.on('disconnect', () => {
                io.emit('poruka', generateMessage('korisnik je napustio chat'))
            })
        })
    }
    res.render('test')
});


module.exports = router;



// 5.tut
/*
io.sockets.on('connection', (socket) => {
            socket.emit('countUpdated', count) // if io.emit ako dode novi korisnik, svakom ce se prikazati

            socket.on('increment', () => {
                count++
                io.emit('countUpdated', count)
            })
        })
*/

/*
// 6. tut
socket.emit('poruka', ' Dobro dosli na chat talashop');

            socket.on('posaljiPoruku', (msg) => {
                io.emit('poruka', msg)
            })
*/

// 7.tut
/*
socket.emit('poruka', ' Dobro dosli na chat talashop');
            socket.broadcast.emit('poruka', 'Chatu se pridruzila nova osoba');

            socket.on('posaljiPoruku', (msg) => {
                io.emit('poruka', msg)
            })

            socket.on('disconnect', () => {
                io.emit('poruka', 'korisnik je napustio chat')
            })
*/

//8.tut
/*
socket.on('sendLocation', (coords) => {
    io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
})
*/

