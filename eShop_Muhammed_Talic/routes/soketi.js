var express = require('express');
var router = express.Router();
var io = null;


router.get('/',
    function(req, res) {
    if (!io){
        io = require('socket.io')(req.connection.server);
        io.sockets.on('connection', (socket) => {
            socket.emit('poruka', ' Dobro dosli na chat talashop');
            socket.broadcast.emit('poruka', 'Chatu se pridruzila nova osoba');

            // socket.on('posaljiPoruku', (msg) => {
            //     io.emit('poruka', msg)
            // })

            socket.on('disconnect', () => {
                io.emit('poruka', 'korisnik je napustio chat')
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
socket.emit('poruka', ' Dobro dosli na chat talashop');

            socket.on('posaljiPoruku', (msg) => {
                io.emit('poruka', msg)
            })
*/
