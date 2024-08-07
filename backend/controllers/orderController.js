import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';


//@desc create new order
//@route post /api/orders
//@access Public
const addOrderItems =asyncHandler (async(req,res)=>{
  
    const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
    } =req.body;
  
  if(orderItems && orderItems.length===0){
    res.status(400);
    throw new Error('No order items');
  }else{
    
    
    const order = new Order({
        orderItems : orderItems.map((x)=>({
            ...x,
            product:x._id,
             _id:undefined
        })),

        user:req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,

    })
    const createdOrder = await order.save();
    res.status(201)
        .json(createdOrder);
  }
  
  
});

//@desc Get Logged IN User Order
//@route get /api/orders/myorders
//@access private
const getMyOrders =asyncHandler (async(req,res)=>{
  const orders =await Order.find({ user:req.user._id});
  
  if (orders) {
    res.status(200)
    .json(orders);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
   
});

//@desc Get Order by ID
//@route get /api/orders/:id
//@access private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
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
   
  const order=await Order.findById(req.params.id);

  if(order){
      order.isDeliverd=true;
      order.deliveredAt=Date.now();

      const updateOrder =await order.save();
      res.status(200).json(updateOrder);
  }else{
     res.status(404);
     throw new Error('Order Not Found !')
  }

})


//@desc Get all Orders
//@route get /api/orders
//@access private/admin
const getOrders =asyncHandler (async(req,res)=>{
  
  const orders =await Order.find({}).populate('user','id name');
  
  res.status(200)
       .json(orders);
});
export {addOrderItems,getMyOrders,getOrderById,updateOrderToPaid
        ,updateOrderToDelivered
        ,getOrders
        };