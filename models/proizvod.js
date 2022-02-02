const mongoose = require("mongoose");

const proizvodSchema = mongoose.Schema({
    naziv: {
        type: String,
        // required: true,
    },
    opis: {
        type: String,
        // required: true
    },
    detaljnjiOpis: {
        type: String,
        default: ''
    },
    brand: {
        type: String,
        default: ''
    },
    grad: {
        type: String,
        default: ''
    },
    cijena : {
        type: Number,
        default: 0
    },
    boja : {
        type: String,
        default: 'Bijela'
    },
    tagovi: [{
        type: String,
    }],
    kolicina: {
        type: Number,
        // required: true,
        default: 1,
        min: 0,
        max: 255
    },

    slike: [{
        type: String
    }],
    slika: {
        type: String,
        default: 'https://i5.walmartimages.com/asr/538e6ee9-b8ce-4c50-bb78-e0ef9ca3e5d7.d92a2e915d667614f121ea11f0d1ec7e.jpeg'
    },

    istaknut: {
        type: Boolean,
        default: false,
    },
    usluga: {
        type: Boolean,
        default: false,
    },
    besplatnaDostava: {
        type: Boolean,
        default: false,
    },
    akcija: {
        type: Boolean,
        default: false,
    },
    stanje: {
        type: String,
        default: 'Novo',
    },
    brojOtvaranja: {
        type: Number,
        default: 0,
    },
    korisnik: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Korisnik"
    },
    kategorija: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Kategorija',
        default: '61e216bd6d2b21a6ef5e4e28', // Ostalo
    },

    // recenzija: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Recenzija"}]
},
    { timestamps: true }
)


Proizvod = mongoose.model('Proizvod', proizvodSchema);
module.exports = Proizvod;

// za TESTIRANJE
// Proizvod = mongoose.model('test_Proizvod', proizvodSchema);
// module.exports = Proizvod;