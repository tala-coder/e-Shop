const mongoose = require('mongoose');

const recenzijaTrgovacSchema = mongoose.Schema(
    {
        korisnik: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Korisnik",
        },
        trgovac: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Korisnik",
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
RecenzijaTrgovac = mongoose.model('RecenzijaTrgovac', recenzijaTrgovacSchema);
module.exports = RecenzijaTrgovac;