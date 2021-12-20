const mongoose = require('mongoose');

const korisnikSchema = new mongoose.Schema({
    nickName: {
        type: String,
        required: true,
    },
    imePrezime: {
        type: String,
        required: true,
        unique: true
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
        type: String,
        default: ''
    },
    jelAdmin: {
        type: Boolean,
        default: false,
    },
    // category: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Trgovina'
    // }
});

exports.Korisnik = mongoose.model('Korisnik', korisnikSchema);
exports.korisnikSchema = korisnikSchema;

