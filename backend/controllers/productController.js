import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

const getProducts = asyncHandler(async(req, res)=>{
    const products = await Product.find({});
    res.json(products);
});

const getProductById = asyncHandler((async(req, res)=>{
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if(product){
      return res.json(product);
    }else{
        res.status(404);
        throw new Error('Resource not found');
    }
}));

const createProduct = asyncHandler(async(req, res)=>{
    const product = new Product({
        user: req.user.id,
        name: 'Sample Name',
        image: '/images/sample.jpg',
        brand: 'Sample Brand',
        category: 'Sample Category',
        description: 'Sample Description',
        rating: 0,
        numReviews: 0,
        price: 0,
        countInStock: 0
    });

    const createdProduct = await product.save();

    res.status(201).json(createdProduct);
});

export { getProducts ,getProductById, createProduct }