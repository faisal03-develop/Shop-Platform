const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Product = require('./models/product.model');


dotenv.config();
connectDB();



const app = express();
app.use(express.json());

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

app.post('/createproduct', async (req, res) => {
    const product = req.body;
    const resposd = await Product.create(product);
    res.status(201).json(resposd);
})

// Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
