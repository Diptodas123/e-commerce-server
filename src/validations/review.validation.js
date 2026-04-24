import zod from 'zod';

const objectId = zod.string().regex(/^[a-f\d]{24}$/i, 'Invalid ID');

export const createReviewSchema = zod.object({
  productId: objectId,
  userId: objectId,
  reviewText: zod.string().optional(),
  rating: zod.number().min(1).max(5),
});
