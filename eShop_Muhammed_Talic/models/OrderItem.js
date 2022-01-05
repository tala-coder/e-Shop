const mongoose = require('mongoose');

const orderItemSchema = mongoose.Schema({
    kolicina: { type: Number, required: true },
    proizvod: {type: mongoose.Schema.Types.ObjectId,
        ref: 'Proizvod' }
},
    { timestamps: true }
)

OrderItem = mongoose.model('OrderItem', orderItemSchema);
module.exports = OrderItem;