const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const Product = require('./models/product.model');
const Order = require('./models/order.model')
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

app.post('/buy', async (req, res) => {
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


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
