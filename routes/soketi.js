var express = require('express');
var router = express.Router();


/*
let io = null;
const {generateMessage, generateLocation, dodajUsera, removeUser, getUser} = require('../helpers/soketi')

router.get('/',
      function(req, res) {
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
    res.render('test')
});
*/


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

