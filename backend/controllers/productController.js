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

export { getProducts ,getProductById }