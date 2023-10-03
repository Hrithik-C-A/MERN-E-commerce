import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems: [{
        name: {type: String, required: true},
        qty: {type: Number, required: true},
        image: {type: String, required: true},
        price: {type: Number, required: true},
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        },
    }],
    orderInfo: {
        id: { type: String, required: true },
        entity: { type: String, required: true },
        amount: {type: Number, required: true },
        amount_paid: { type: Number, required: true },
        amount_due: { type: Number, required: true },
        currency: { type: String, required: true },
        receipt: { type: String, required: true },
        offer_id: { type: String, required: false , default: null },
        status: { type: String, required: true },
        attempts: { type: Number, required: true },
        notes: [],
        created_at: { type: Number, required: true }
    },
    shippingAddress: {
        address: {type: String , required: true},
        city: {type: String , required: true},
        postalCode: {type: String , required: true},
        country: {type: String , required: true},
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentResult: {
        id: {type: String},
        status: {type: String},
        order_id: {type: String},
        pay_id: {type: String},
        pay_signature: {type: String},
        // update_time: {type: String},
        email_address: {type: String}
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt: {
        type: Date
    }
},
{
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order;