import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';


//@desc Fetch all Products
//@route GET /api/products
//@access Public
const getPrducts =asyncHandler (async(req,res)=>{
    const products = await Product.find({});
    if (products) {
        res.json(products);
    }

     res.status(404).json({ message: 'Products Not Found' });
});


//@desc Fetch all given id product
//@route GET /api/products/id
//@access Public
const getPrductById =asyncHandler(async(req,res)=>{
    let product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    }else{

     res.status(404)
     throw new Error('Resorces not found');
    }
})


//@desc Create a  product
//@route POST /api/products
//@access Private /Admin
const createProduct =asyncHandler(async(req,res)=>{
    const product =new Product({
        name:'Sample Name',
        price: 0,
        user: req.user._id,
        image:'/image/sample.jpg',
        description: 'sample description.',
        brand: 'sample Brand',
        category: 'sample Category',
        countInStock: 0,
        numReviews: 0 
    })

    const createProduct =await product.save();
    res.status(201).json(createProduct);
})

export {getPrducts,getPrductById ,createProduct};