const mongoose = require("mongoose");

const recenzijaSchema = mongoose.Schema(
    {
        korisnik: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Korisnik",
        },
        ime: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        komentar: {
            type: String,
            required: true,
        },
        /*vrijemeKreiranja: {
            type: Date,
            default: Date.now,
        },*/
    },
    {
        timestamps: true,
    }
);

const proizvodSchema = mongoose.Schema({
    naziv: {
        type: String,
        required: true,
    },
    opis: {
        type: String,
        required: true
    },
    detaljnjiOpis: {
        type: String,
        default: ''
    },
    brand: {
        type: String,
        default: ''
    },
    cijena : {
        type: Number,
        default:0
    },
    kategorija: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Kategorija',
        required:true
    },
    tagovi: [{
        type: String,
    }],
    kolicina: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
/*    rating: {
        type: Number,
        default: 0,
    },
    brojRecenczija: {
        type: Number,
        default: 0,
    },*/
    slika: {
        type: String,
        default: ''
    },
    slike: [{
        type: String
    }],
    istaknut: {
        type: Boolean,
        default: false,
    },
    datumKreiranja: {
        type: Date,
        default: Date.now,
    },
    recenzija: [recenzijaSchema],
})


Proizvod = mongoose.model('Proizvod', proizvodSchema);
module.exports = Proizvod;