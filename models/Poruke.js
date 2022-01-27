const mongoose = require('mongoose');

const porukeSchema = mongoose.Schema({
    kupac:    { type: String},
    trgovac:  { type: String},
    soba:     { type: String},
    chat:     { type: String }
},
    { timestamps: true }
)

Poruke = mongoose.model('Poruke', porukeSchema);
module.exports = Poruke;
