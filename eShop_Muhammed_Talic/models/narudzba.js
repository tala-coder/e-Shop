const mongoose = require('mongoose');

const narudzbaSchema = mongoose.Schema({
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        // required:true
    }],
        ukupnaCijena: {
            type: Number,
            default: 0,
        }
},
    { timestamps: true }
)

Narudzba = mongoose.model('Narudzba', narudzbaSchema);
module.exports = Narudzba;
//module.exports = mongoose.model('TEST_Narudzba', narudzbaSchema);


// Narudzba = mongoose.model('Narudzba', narudzbaSchema);
// module.exports = Narudzba;

