import express from 'express';
import { getFilteredProducts, getProductDetails } from '#controllers/shop.controller.js';

const router = express.Router();

//------------ Product Routes ------------//

router.get('/products', getFilteredProducts);
router.get('/products/:id', getProductDetails);

export default router;
