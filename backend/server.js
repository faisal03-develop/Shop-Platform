const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
// const Product = require('./models/product.model');
const getproducts = require('./routes/fetchProducts.route');
const products = require('./routes/products.route');
dotenv.config();
connectDB();



const app = express();
app.use(express.json());
app.use(cors());

// Middleware
app.use(express.json());


app.get('/', (req, res) => {
  res.send('API is running...');
});


app.use('', products)
app.use('', getproducts)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
