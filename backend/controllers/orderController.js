import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';


//@desc create new order
//@route post /api/orders
//@access Public
const addOrderItems =asyncHandler (async(req,res)=>{
   res.status(200)
        .json('add Order Items');
});

//@desc Get Logged IN User Order
//@route get /api/orders/myorders
//@access private
const getMyOrders =asyncHandler (async(req,res)=>{
   res.status(200)
       .json('get my orders');
});

//@desc Get Order by ID
//@route get /api/orders/:id
//@access private
const getOrderById =asyncHandler (async(req,res)=>{
    res.status(200)
        .json('get order by id');
 });

//@desc Update order to paid 
//@route put /api/orders/:id/pay
//@access Private 

const updateOrderToPaid =asyncHandler (async (req,res)=>{
    res.send('update order to paid');
})

//@desc update order to elivered
//@route GET /api/orders/:id/deliver
//@access Private

const updateOrderToDelivered = asyncHandler(async(req,res)=>{
    res.send('update order to delivered')
})


//@desc Get all Orders
//@route get /api/orders
//@access private/admin
const getOrders =asyncHandler (async(req,res)=>{
   res.status(200)
       .json('get all orders');
});
export {addOrderItems,getMyOrders,getOrderById,updateOrderToPaid
        ,updateOrderToDelivered
        ,getOrders
        };