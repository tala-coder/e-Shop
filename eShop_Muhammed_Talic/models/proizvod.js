const mongoose = require("mongoose");
const moment = require("moment");
moment.locale('bs');

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
    grad: {
        type: String,
        default: ''
    },
    cijena : {
        type: String,
        default: '0'
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
    besplatnaDostava: {
        type: Boolean,
        default: false,
    },
    akcija: {
        type: Number,
        default: null,
    },
    brojOtvaranja: {
        type: Number,
        default: 0,
    },
    kategorija: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Kategorija',
        required: true
    },
    korisnik: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Korisnik",
        required: true
    },
    recenzija: [recenzijaSchema],
},
    { timestamps: true }
)

// proizvodSchema.virtual('va').get(function() {
//     return moment(this.createdAt).endOf('second').fromNow()
// });

proizvodSchema.virtual('varijabla').get(function() {
    return "varijabla";
})

/*
za PRODUKCIJU
Proizvod = mongoose.model('Proizvod', proizvodSchema);
module.exports = Proizvod;*/

// za TESTIRANJE
Proizvod = mongoose.model('test_Proizvod', proizvodSchema);
module.exports = Proizvod;