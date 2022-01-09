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
    boja : {
        type: String,
        default: 'Bijela'
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
    slike: [{
        type: String
    }],
    slika: {
        type: String,
        default: ''
    },

    istaknut: {
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