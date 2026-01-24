import zod from "zod";

export const orderSchema = zod.object({
    cartId: zod.string().min(1, 'Cart ID is required'),
    
    cartItems: zod.array(zod.object({
        productId: zod.string().min(1, 'Product ID is required'),
        title: zod.string().min(1, 'Title is required'),
        image: zod.string().min(1, 'Image is required'),
        price: zod.number().min(0, 'Price must be a positive number'),
        quantity: zod.number().min(1, 'Quantity must be at least 1')
    })).min(1, 'Cart items cannot be empty'),

    addressInfo: zod.object({
        address: zod.string().min(1, 'Address is required'),
        city: zod.string().min(1, 'City is required'),
        postalCode: zod.string().min(1, 'Postal code is required'),
        country: zod.string().min(1, 'Country is required'),
        phone: zod.string().min(1, 'Phone is required'),
        notes: zod.string().optional()
    }),

    orderStatus: zod.enum(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']).default('pending'),

    paymentMethod: zod.enum(['credit_card', 'paypal', 'bank_transfer']).default('credit_card'),

    paymentStatus: zod.enum(['pending', 'paid', 'failed']).default('pending'),

    totalAmount: zod.number().min(0, 'Total amount must be a positive number'),

    paymentId: zod.string().optional(),

    payerId: zod.string().optional()
});

export const capturePaymentSchema = zod.object({
    paymentId: zod.string().min(1, 'Payment ID is required'),
    payerId: zod.string().min(1, 'Payer ID is required'),
    orderId: zod.string().min(1, 'Order ID is required')
});
