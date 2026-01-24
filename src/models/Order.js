import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
    },
    cartItems: [
        {
            productId: String,
            title: String,
            image: String,
            price: Number,
            quantity: Number
        }
    ],
    addressInfo: {
        addressId: String,
        address: String,
        city: String,
        postalCode: String,
        country: String,
        phone: String,
        notes: String
    },
    orderStatus: String,
    paymentMethod: String,
    paymentStatus: String,
    totalAmount: Number,
    paymentId: String,
    payerId: String
}, { timestamps: true });

export const Order = mongoose.model("Order", orderSchema);
