import zod from 'zod';

export const createReviewSchema = zod.object({
  productId: zod.string().uuid(),
  userId: zod.string().uuid(),
  reviewText: zod.string().optional(),
  rating: zod.number().min(1).max(5),
});
