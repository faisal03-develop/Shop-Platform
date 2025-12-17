const express = require('express');
const buy = express.Router();
const Product = require('../models/product.model');
const Order = require('../models/order.model');
const mongoose = require('mongoose');




buy.post('/buy', async (req, res) => {
    try {
        const { _id, quantity } = req.body;
        const product = await Product.findById(_id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const orderItem = {
            product: product._id,
            name: product.name,
            price: product.price,
            quantity
        };

        const totalPrice = product.price * quantity;

        const order = await Order.create({
            orderItems: [orderItem],
            totalPrice
        });

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = buy;