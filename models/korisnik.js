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
            default: ""
            // required: true,
        },
        telefonFirme: {
            type: String,
            default: ""
            // required: true,
        },
        mailFirme: {
            type: String,
            default: ""
            // required: true,
        },
        adresaFirme: {
            type: String,
            default: ""
            // required: true,
        },
        gradFirme: {
            type: String,
            default: ""
            // required: true,
        },
        adresePoslovnica: {
                type: String,
            default: ""
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
        // kategorijeUsluga: [{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "Kategorija",
        // }],
        kategorijeUsluga: [{
            type: String,
            default: ""
        }],
    },
    { timestamps: true }
    );

const korisnikSchema = new mongoose.Schema({

    nickName: {
        type: String,
        // required: true,
    },
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
    slika: {
        type: String,
        default: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'
    },
    grad: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        default: 'aktivan'
    },
    blokiranDo: {
        type: Number,
        default: null
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
    adminSistema: {
        type: Boolean,
        default: false,
    },
    trgovina: {
        type: trgovinaSchema,
        default: null
    },

    interesi: [{ // bez referenci uradit
                type: mongoose.Schema.Types.ObjectId,
                ref: "Kategorija",
        default : null
            }],


    // O KARTICI
    //     brojKartice: {
    //         type: String,
    //         default: ''
    //     },
    //     expire: {
    //         type: String,
    //         default: ''
    //     },
    //     cvv: {
    //         type: String,
    //         default: ''
    //     },
},
    { timestamps: true }
);

Korisnik = mongoose.model('Korisnik', korisnikSchema);
module.exports = Korisnik;


