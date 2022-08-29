/** @format */

import express from 'express';
// import authMiddleware from '../middleware/verifyAuth';
import categoryController from '../controllers/category';
const router = express.Router();

// router.get('/api/category/list', categoryController.getAllCategory);
// router.post('/api/category/create', categoryController.createCategory);
// router.put('/api/category/update', categoryController.updateCategory);
// router.delete('/api/category/delete', categoryController.deleteCategory);

router.get('/category/:slug', categoryController.getCategoryDetail);

export default router;
