const mongoose = require('mongoose');

const orderItemSchema = mongoose.Schema({
    korisnik: { type: mongoose.Schema.Types.ObjectId, ref: 'Korisnik' },
    trgovac:  { type: mongoose.Schema.Types.ObjectId, ref: 'Korisnik' },
    kolicina: { type: Number, required: true , default: 1},
    proizvod: { type: mongoose.Schema.Types.ObjectId, ref: 'Proizvod' },
    status:   { type: String,  default: 'Čeka se odobrenje trgovca'},
        cijenaProizvoda:   { type: Number,  default: 0},
        adresa1: {
            type: String,
            // required: true,
        },
        adresa2: {
            type: String,
        },
        grad: {
            type: String,
            // required: true,
        },
        postanskiBroj: {
            type: String,
            // required: true,
        },
        zemlja: {
            type: String,
            // required: true,
        },
        telefon: {
            type: String,
            // required: true,
        },
        poruka: {
            type: String,
            // required: true,
        },

},
    { timestamps: true }
)

// exports.OrderItem = mongoose.model('OrderItem', orderItemSchema);

OrderItem = mongoose.model('OrderItem', orderItemSchema);
module.exports = OrderItem;
