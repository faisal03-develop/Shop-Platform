
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
});

const orderSchema = new mongoose.Schema(
    {
        orderItems: [orderItemSchema],

        totalPrice: {
            type: Number,
            required: true,
            default: 0
        }
    },
    { timestamps: true }
);



module.exports = mongoose.model('Order', orderSchema);


