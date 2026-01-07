import zod from "zod";

export const productSchema = zod.object({
    image: zod.string().nonempty(),
    title: zod.string().min(2).max(255).trim(),
    description: zod.string().min(10).max(2000).trim(),
    category: zod.string().min(2).max(100).trim(),
    brand: zod.string().min(2).max(100).trim(),
    price: zod.coerce.number().positive(),
    salePrice: zod.coerce.number().positive().optional().or(zod.literal('')),
    totalStock: zod.coerce.number().int().nonnegative()
});
