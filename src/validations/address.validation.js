import zod from "zod";

export const addressSchema = zod.object({
    address: zod.string().min(1),
    city: zod.string().min(1),
    postalCode: zod.string().min(1),
    country: zod.string().min(1),
    phone: zod.string().min(1),
    notes: zod.string().optional()
});
