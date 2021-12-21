const mongoose = require('mongoose');

const trgovinaSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Korisnik",
        },
        naziv: {
            type: String,
            required: true,
        },
        telefon: {
            type: String,
            required: true,
        },
        mail: {
            type: String,
            required: true,
        },
        adresa: {
            type: String,
            required: true,
        },
        adresePoslovnica: [ // [] //
            {
                grad: {
                    type: String,
                    required: true,
                },
                ulica: {
                    type: String,
                    required: true,
                },
        }
        ],
        kategorijeUsluga: [{
            type: String,
            required: true,
        }],
    }
    );

const korisnikSchema = new mongoose.Schema({
    nickName: {
        type: String,
        required: true,
        // unigue: true
    },
    imePrezime: {
        type: String,
        required: true,
    },
    mail: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true,
    },
    telefon: {
        type: String,
        required: true,
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
    trgovina: [trgovinaSchema]
});


exports.Korisnik = mongoose.model('Korisnik', korisnikSchema);
exports.korisnikSchema = korisnikSchema;

