const express = require('express');
const getproducts = express();
const Product = require('../models/product.model');
const mongoose = require('mongoose');


getproducts.get('/getproducts', async (req,res) => {
  const products = await Product.find();
  res.status(200);
  res.json(products);
});

module.exports = getproducts;