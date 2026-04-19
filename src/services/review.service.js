import { ProductReview } from '#models/Reviews.js';
import { Order } from '#models/Order.js';
import { BadRequestError } from '#utils/errors.js';

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

    const averageRatingAggregation = await ProductReview.aggregate([
        { $match: { productId: newReview.productId } },
        {
            $group: {
                _id: '$productId',
                averageRating: { $avg: '$rating' },
                totalReviews: { $sum: 1 }
            }
        }
    ]);

    return newReview;
}

const getProductReviewsFromDatabase = async (productId) => {
    const productReviews = await ProductReview.find({ productId }).populate({
        path: 'userId',
        select: 'userName'
    });
    return productReviews;
}

export { addProductReviewInDatabase, getProductReviewsFromDatabase };