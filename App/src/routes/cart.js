/** @format */

import express from 'express';
// import authMiddleware from '../middleware/verifyAuth';
import cartController from '../controllers/cart';

const router = express.Router();

router.get('/cart', cartController.index);
router.post('/cart', cartController.saveCart);

router.get('/api/cart/addToCart', cartController.addToCart);
router.get('/api/cart/deleteItemInCart', cartController.deleteItemInCart);
router.get('/api/cart/updateQuantity', cartController.updateQuantity);
router.get('/api/cart/getCartTotalPrice', cartController.getTotalPrice);
router.get('/api/cart/getQuantity', cartController.getQuantity);

export default router;
