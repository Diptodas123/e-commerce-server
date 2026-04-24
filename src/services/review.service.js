import { ProductReview } from '#models/Reviews.js';
import { Order } from '#models/Order.js';
import { BadRequestError } from '#utils/errors.js';
import mongoose from 'mongoose';

const addProductReviewInDatabase = async ({ productId, userId, reviewText, rating }) => {

    // Check if user has purchased the product before allowing them to review
    const hasPurchased = await Order.exists({
        userId,
        'cartItems.productId': productId,
        orderStatus: 'confirmed'
    });

    if (!hasPurchased) {
        throw new BadRequestError("User must purchase the product before reviewing");
    }

    // Check if user has already reviewed the product
    const existingReview = await ProductReview.findOne({ productId, userId });

    if (existingReview) {
        throw new BadRequestError("User has already reviewed this product");
    }

    // Create and save the new review if the user is eligible to review
    const newReview = new ProductReview({
        productId,
        userId,
        reviewText,
        rating
    });

    await newReview.save();

    return newReview;
}

const getProductReviewsFromDatabase = async (productId) => {
    const [reviews, stats] = await Promise.all([
        ProductReview.find({ productId }).populate({ path: 'userId', select: 'userName' }).lean(),
        ProductReview.aggregate([
            { $match: { productId: new mongoose.Types.ObjectId(productId) } },
            {
                $group: {
                    _id: '$productId',
                    averageRating: { $avg: '$rating' },
                    totalReviews: { $sum: 1 }
                }
            }
        ])
    ]);

    const averageRating = stats.length > 0 ? stats[0].averageRating.toFixed(2) : 0;
    const totalReviews = stats.length > 0 ? stats[0].totalReviews : 0;

    const flatReviews = reviews.map(({ userId, ...rest }) => ({
        ...rest,
        userName: userId?.userName ?? null,
    }));

    return { reviews: flatReviews, averageRating, totalReviews };

}

export { addProductReviewInDatabase, getProductReviewsFromDatabase };