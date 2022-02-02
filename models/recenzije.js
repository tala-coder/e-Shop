const mongoose = require('mongoose');

const recenzijaSchema = mongoose.Schema(
    {
        tip: {
            type: String,
        },
        korisnik: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Korisnik",
        },
        proizvod: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Proizvod",
        },
        rating: {
            type: Number,
        },
        komentar: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);
Recenzija = mongoose.model('Recenzija', recenzijaSchema);
module.exports = Recenzija;