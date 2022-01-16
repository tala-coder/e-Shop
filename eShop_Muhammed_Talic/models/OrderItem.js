const mongoose = require('mongoose');

const orderItemSchema = mongoose.Schema({
    korisnik: {type: mongoose.Schema.Types.ObjectId,
        ref: 'Korisnik' },
    kolicina: { type: Number, required: true , default: 1},
    proizvod: {type: mongoose.Schema.Types.ObjectId,
        ref: 'Proizvod' }
},
    { timestamps: true }
)

// exports.OrderItem = mongoose.model('OrderItem', orderItemSchema);

OrderItem = mongoose.model('OrderItem', orderItemSchema);
module.exports = OrderItem;
