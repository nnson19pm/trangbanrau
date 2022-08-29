/** @format */

import express from 'express';
import authMiddleware from '../../middleware/verifyAuth';
import { uploadSingle } from '../../middleware/uploadSingle';
import AdminProductController from '../../controllers/admin/adminProduct';
import Product from '../../controllers/product';
import { checkFile } from '../../middleware/checkFile';

import multer from 'multer';
const upload = multer({ dest: 'src/public/images' });

const router = express.Router();

router.get('/admin/product', authMiddleware.checkAdminAndStaff, AdminProductController.index);

router.get('/admin/product/edit/:id', authMiddleware.checkAdminAndStaff, AdminProductController.edit);
router.post('/admin/product/edit/:id', [authMiddleware.checkAdminAndStaff, checkFile, uploadSingle], Product.updateProduct);

router.get('/admin/product/delete/:id', authMiddleware.checkAdminAndStaff, Product.deleteProduct);

router.get('/admin/product/create', authMiddleware.checkAdminAndStaff, AdminProductController.create);
router.post('/admin/product/create', [authMiddleware.checkAdminAndStaff, checkFile, uploadSingle], Product.createProduct);

router.get('/admin/product/garbage-can',authMiddleware.checkAdminAndStaff, AdminProductController.garbageCan);
router.get('/admin/product/restore/:id', authMiddleware.checkAdminAndStaff, Product.restoreProduct);

export default router;
