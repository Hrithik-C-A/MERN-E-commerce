import express from "express";
import { addOrderItems, getMyOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered, getOrders, createRazorpayOrder, verifyRazorpayOrder, getRazorpayClientId } from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/razorpay/clientid').get(protect, getRazorpayClientId);
router.route('/razorpay/createorder').post(protect, createRazorpayOrder);
router.route('/razorpay/verifyorder').post(protect, verifyRazorpayOrder);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;