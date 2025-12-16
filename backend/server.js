const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Product = require('./models/product.model');

dotenv.config();
connectDB();



const app = express();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});


app.get('/products', async (req,res) => {
    const products = await Product.find({});
    console.log(products);
    // res.json(products);

})

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
