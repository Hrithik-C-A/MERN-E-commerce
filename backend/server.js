import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import cors from 'cors';
import products from './data/products.js'

const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(cors());

app.get('/',(req, res)=>{
    res.send('Api is running...')
});

app.get('/api/products',(req, res)=>{
    res.json(products);
});

app.get('/api/products/:id', (req, res)=>{
    const productId = req.params.id;
    const product = products.find((p)=> p._id === productId);
    res.json(product);
});

app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`);
});
