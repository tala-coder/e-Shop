const mongoose = require('mongoose');

const narudzbaSchema = mongoose.Schema({
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required:true
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
        default: 'Pending',
    },
    ukupnaCijena: {
        type: Number,
    },
    korisnik: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Korisnik',
    },
},
    { timestamps: true }
)


Narudzba = mongoose.model('Narudzba', narudzbaSchema);
module.exports = Narudzba;
/*
{
    "orderItems" : [
    {
        "kolicina": 3,
        "proizvod" : "5fcfc406ae79b0a6a90d2585"
    },
    {
        "kolicina": 2,
        "proizvod" : "5fd293c7d3abe7295b1403c4"
    }
],
    "adresa1" : "Flowers Street , 45",
    "adresa2" : "1-B",
    "grad": "Prague",
    "postanskiBroj": "00000",
    "zemlja": "Czech Republic",
    "telefon": "+420702241333",
    "korisnik": "5fd51bc7e39ba856244a3b44"
}
*/