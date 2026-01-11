import { Product } from "#models/Product.js"

export const getProductsByFilters = async (category, brand, sortBy) => {

    let categoryArray = [];
    let brandArray = [];

    if (category && category.length) {
        categoryArray = category.split(",");
    }
    if (brand && brand.length) {
        brandArray = brand.split(",");
    }

    switch (sortBy) {
        case "price-lowtohigh":
            sortBy = { price: 1 };
            break;
        case "price-hightolow":
            sortBy = { price: -1 };
            break;
        case "title-atoz":
            sortBy = { title: 1 };
            break;
        case "title-ztoa":
            sortBy = { title: -1 };
            break;
        default:
            sortBy = { price: 1 };
    }

    // Build query conditionally
    const query = {};
    if (categoryArray.length > 0) {
        query.category = { $in: categoryArray };
    }
    if (brandArray.length > 0) {
        query.brand = { $in: brandArray };
    }

    const products = await Product.find(query).sort(sortBy);

    return products;
}

export const getProductById = async (id) => {
    const product = await Product.findById(id);
    return product;
}
