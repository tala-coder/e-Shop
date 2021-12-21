const mongoose = require('mongoose');

const orderItemSchema = mongoose.Schema({
    kolicina: {
        type: Number,
        required: true
    },
    proizvod: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proizvod'
    }
})

exports.OrderItem = mongoose.model('OrderItem', orderItemSchema);