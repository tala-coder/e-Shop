const mongoose = require('mongoose');

const narudzbaSchema = mongoose.Schema({
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        // required:true
    }],
    adresa1: {
        type: String,
        required: true,
    },
    adresa2: {
        type: String,
    },
    grad: {
        type: String,
        required: true,
    },
    postanskiBroj: {
        type: String,
        required: true,
    },
    zemlja: {
        type: String,
        required: true,
    },
    telefon: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'Na čekanju',
    },
    ukupnaCijena: {
        type: Number,
        default: 0,
    },
    korisnik: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Korisnik',
    },
    trgovac: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Korisnik',
    },
},
    { timestamps: true }
)

Narudzba = mongoose.model('TEST_Narudzba', narudzbaSchema);
module.exports = Narudzba;
//
// Narudzba = mongoose.model('Narudzba', narudzbaSchema);
// module.exports = Narudzba;

