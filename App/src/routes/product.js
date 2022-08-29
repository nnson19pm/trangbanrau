/** @format */

import express from 'express';
// import authMiddleware from '../middleware/verifyAuth';
import productController from '../controllers/product';
import handleUploadMultiple from '../middleware/uploadMultiple';
import handleUploadSingle from '../middleware/uploadSingle';

const router = express.Router();

// router.get('/api/product/list', productController.getAllProducts);
// router.post('/api/product/create', handleUploadMultiple, productController.createProduct);
// router.put('/api/product/update', handleUploadSingle, productController.updateProduct);
// router.delete('/api/product/delete', productController.deleteProduct);

router.get('/product/:id', productController.getProductDetail);

export default router;
