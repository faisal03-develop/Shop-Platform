const express = require('express');
const Product = require('../models/product.model');
const products = express.Router();


products.use(express.json());

products.post('/createproduct', async (req, res) => {
    const product = req.body;
    const resposd = await Product.create(product);
    res.status(201).json(resposd);
})

module.exports = products;