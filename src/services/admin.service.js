import logger from "#config/logger.js";
import { Product } from "#models/Product.js";

export const addProductToDB = async ({
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock
}) => {
    logger.info(`Adding new product: ${title} from this brand: ${brand}`);

    // Create and save the new product
    const newProduct = await Product.create({
        image,
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock
    });

    return newProduct;
}

export const fetchAllProductsFromDB = async () => {
    logger.info("Fetching all products from the database");

    const allProducts = await Product.find({});
    return allProducts
}

export const editProductInDB = async (productId, updatedProductData) =>{
    logger.info(`Editing product with ID: ${productId}`);
    const updatedProduct = await Product.findByIdAndUpdate(productId, updatedProductData, { new: true});
    return updatedProduct;
};

export const deleteProductFromDB = async (productId) => {
    logger.info(`Deleting product with ID: ${productId}`);
    const deletedProduct = await Product.findByIdAndDelete(productId);
    return deletedProduct;
}