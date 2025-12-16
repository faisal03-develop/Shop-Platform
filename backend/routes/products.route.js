const express = require('express');
const dotenv = require('dotenv');
const Product = require('../models/product.model');
const connectDB = require('./config/db');
connectDB();

dotenv.config();
const products = express();


products.get('/products', async (req,res) => {
    const products = await Product.find({});
    console.log(products);
    // res.json(products);

})