const mongoose = require('mongoose');

const kategorijaSchema = mongoose.Schema({
    naziv: {
        type: String,
        required: true,
    },
    ikona: {
        type: String,
    },
    slika: {
        type: String,
        default: ''
    },
    boja: { // Mozda staviti niz boje' ?
        type: String,
    }
})

Kategorija = mongoose.model('Kategorija', kategorijaSchema);
module.exports = Kategorija;