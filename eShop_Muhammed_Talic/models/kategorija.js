const mongoose = require('mongoose');

const kategorijaSchema = mongoose.Schema({
    naziv: {
        type: String,
        required: true,
    },
    slika: {
        type: String,
        default: ''
    }
})

Kategorija = mongoose.model('Kategorija', kategorijaSchema);
module.exports = Kategorija;