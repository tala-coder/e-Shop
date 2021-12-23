const mongoose = require('mongoose');

const trgovinaSchema = mongoose.Schema(
    {
        // user: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     // required: true,
        //     ref: "Korisnik",
        // },
        naziv: {
            type: String,
            // required: true,
        },
        // telefon: {
        //     type: String,
        //     // required: true,
        // },
        // mail: {
        //     type: String,
        //     required: true,
        // },
        // adresa: {
        //     type: String,
        //     required: true,
        // },
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
        // required: true,
        // unique: true
    },
    passwordHash: {
        type: String,
        required: true,
    },
    telefon: {
        type: String,
        // required: true,
    },
    zemlja: {
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
    trgovina: trgovinaSchema,
    interesi: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Kategorija",
            }],

});


exports.Korisnik = mongoose.model('Korisnik', korisnikSchema);
exports.korisnikSchema = korisnikSchema;

