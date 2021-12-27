const mongoose = require('mongoose');

const trgovinaSchema = mongoose.Schema(
    {
        // user: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     // required: true,
        //     ref: "Korisnik",
        // },
        nazivFirme: {
            type: String,
            // required: true,
        },
        telefonFirme: {
            type: String,
            // required: true,
        },
        mailFirme: {
            type: String,
            // required: true,
        },
        adresaFirme: {
            type: String,
            // required: true,
        },
        adresePoslovnica: {
                type: String,
            },
       /* adresePoslovnica: [ // [] //
            {
                grad: {
                    type: String,
                    // required: true,
                },
                ulica: {
                    type: String,
                    // required: true,
                },
        }
        ],*/
        kategorijeUsluga: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Kategorija",
        }],
    }
    );

const korisnikSchema = new mongoose.Schema({
    ime: {
        type: String,
        // required: true,
        // unigue: true
    },
    prezime: {
        type: String,
        // required: true,
    },
    mail: {
        type: String,
        lowercase: true,
        // required: true,
        // unique: true
    },
    passwordHash: {
        type: String,
        required: true,
        minLenght: [6, 'Minimalna dužina šifre je 6 karaktera.'] // todo u htmlu dodat
    },
    telefon: {
        type: String,
        // required: true,
    },
    zemlja: {
        type: String,
        default: ''
    },
    spol: {
        type: String,
        default: ''
    },
    grad: {
        type: String,
        default: ''
    },
    ulica: {
        type: String,
        default: ''
    },
    postanskiBroj :{
        type: Number,
        default: ''
    },
    jelAdmin: {
        type: Boolean,
        default: false,
    },
    trgovina: [{
        type: trgovinaSchema,
        default: null
    }],
    interesi: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Kategorija",
            }],

});

// Kolekcija za test
exports.Korisnik = mongoose.model('TEST_korisnik', korisnikSchema);
exports.korisnikSchema = korisnikSchema;

// exports.Korisnik = mongoose.model('Korisnik', korisnikSchema);
// exports.korisnikSchema = korisnikSchema;
