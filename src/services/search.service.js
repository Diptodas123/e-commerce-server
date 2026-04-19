import { Product } from "#models/Product.js";

export const getSearchResults = async (regEx) => {
    const searchQuery = {
        $or: [
            {title : regEx},
            {description : regEx},
            {category : regEx},
            {brand : regEx}
        ]
    };

    const searchResults = await Product.find(searchQuery);
    return searchResults;
};