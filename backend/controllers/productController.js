import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';


//@desc Fetch all Products
//@route GET /api/products
//@access Public
const getPrducts =asyncHandler (async(req,res)=>{
    
    const pageSize =3;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword ? {name : {$regex : req.query.keyword , $options : 'i'} } : {};

    const count =await Product.countDocuments({...keyword});
    
    const products = await Product.find({...keyword})
                                  .limit(pageSize)
                                  .skip(pageSize * (page-1));
                                  res.json({ products, page, pages: Math.ceil(count / pageSize) });
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

//@desc update a  product
//@route PUT /api/products/:id
//@access Private /Admin
const updateProduct =asyncHandler(async (req , res)=>{
    const { 
        name,
        image,
        description,
        brand,
        category,
        price,
        countInStock,
     } =req.body;

     const product = await Product.findById(req.params.id);

     if(product){
        product.name=name;
        product.image=image;
        product.description=description;
        product.brand=brand;
        product.category=category;
        product.price=price;
        product.countInStock=countInStock;

        const updateProduct =await product.save();

        res.json(updateProduct);
     }else{
        res.status(404);
        throw new Error('Resource not found');
     }
});

//@desc Delete a  product
//@route Delete /api/products/:id
//@access Private /Admin
const deleteProduct =asyncHandler(async (req , res)=>{
    
     const product = await Product.findById(req.params.id);

     if(product){
       await Product.deleteOne({_id : product._id});
        res.status(200)
            .json({message : 'Product removed'});
        
     }else{
        res.status(404);
        throw new Error('Resource not found');
     }
});

//@desc Review a  product
//@route POST /api/products/:id/review
//@access Private 
const createProductReview =asyncHandler(async (req , res)=>{
    
    const {rating , comment} =req.body;
    const product = await Product.findById(req.params.id);

    if(product){
     
        const alredyReviewd= product.reviews.find(
            (review) => review.user.toString() === req.user._id.toString()
        );

        if(alredyReviewd){
            res.status(400);
            throw new Error('Product alredy reviewd');
        }
       
        const review ={
            name: req.user.name,
            rating : Number(rating),
            comment,
            user: req.user._id,
        }

        product.reviews.push(review)
        product.numReviews = product.reviews.length;

        product.rating=
            product.reviews.reduce((acc , review)=>acc+ review.rating ,0)/product.reviews.length;


        await product.save();
        res.status(201).json({message: 'Review Added'});
    }else{
       res.status(404);
       throw new Error('Resource not found');
    }
});

//@desc Get top rated products
// @route GET /api/products/top
//@access Public

const getTopProducts =asyncHandler(async (req, res)=>{
 const products =await Product.find({})
                              .sort({ rating: -1})
                              .limit(3);

 res.status(200)
    .json(products);
})

export {
            getPrducts,
            getPrductById,
            createProduct,
            updateProduct,
            deleteProduct,
            createProductReview,
            getTopProducts

};