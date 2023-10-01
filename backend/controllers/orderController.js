import Razorpay from 'razorpay';
import crypto from 'crypto';
import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";


const addOrderItems = asyncHandler(async(req, res)=>{
    const { orderItems, orderInfo, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    if(orderItems && orderItems.length === 0){
        res.status(400);
        throw new Error('No order items');
    }else{
        const order = new Order({
            orderItems: orderItems.map( x => ({
                ...x,
                product: x._id,
                _id: undefined
            })),
            orderInfo: orderInfo,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })
        const createOrder = await order.save();

        res.status(201).json(createOrder);
    }
});

const getMyOrders = asyncHandler(async(req, res)=>{
    const orders = await Order.find({user: req.user._id});

    res.status(200).json(orders);
});

const getOrderById = asyncHandler(async(req, res)=>{
    const order = await Order.findById(req.params.id).populate('user', 'name, email');

    if(order){
        res.status(200).json(order);
    }else {
        res.status(404);
        throw new Error('Order not found');
    }
});

const updateOrderToPaid = asyncHandler(async(req, res)=>{
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        }

    const updatedOrder = await order.save();
    
    res.status(200).json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

const updateOrderToDelivered = asyncHandler(async(req, res)=>{
    res.send('update order to delivered')
});

const getOrders = asyncHandler(async(req, res)=>{
    res.send('get all orders')
});

//Razorpay

const createRazorpayOrder = asyncHandler(async(req, res) => {
    const {price, currency, receipt, notes} = req.body;

    const amount = price * 100;

    const KEY_ID = process.env.KEY_ID;
    const KEY_SECRET = process.env.KEY_SECRET; 

    const razorpayInstance = new Razorpay({
        key_id: `${KEY_ID}`,
        key_secret: `${KEY_SECRET}`
    });

    razorpayInstance.orders.create({amount, currency, receipt, notes}, 
        (err, order)=>{
          if(!err)
            res.json({order, KEY_ID});
          else
            res.send(err);
        })
});

const verifyRazorpayOrder = asyncHandler(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id } = req.body;
    const razorpay_signature = req.headers['x-razorpay-signature'];

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const KEY_SECRET = process.env.KEY_SECRET;

    const generated_signature = crypto
          .createHmac("sha256", KEY_SECRET)
          .update(sign.toString())
          .digest("hex");

    // console.log('1', razorpay_signature)
    // console.log('2', generated_signature)
          
  if(razorpay_signature===generated_signature){
    res.json({success:true, message:"Payment has been verified"})
  }
  else {
    res.json({success:false, message:"Payment verification failed"})
  }
});

export { addOrderItems, getMyOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered, getOrders, createRazorpayOrder, verifyRazorpayOrder };