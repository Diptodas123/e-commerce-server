import { Product } from "#models/Product.js"

export const getProductsByFilters = async () => {
    return Product.find({});
}
