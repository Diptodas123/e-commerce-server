import express from 'express';
import { getFilteredProducts } from '#controllers/shop.controller.js';

const router = express.Router();

//------------ Product Routes ------------//

router.get('/products', getFilteredProducts);


export default router;
