import express from 'express';
import authMiddleware from '../../middleware/verifyAuth';
import AdminProductCategoryController from '../../controllers/admin/adminProductCategory';
import Category from "../../controllers/category";

const router = express.Router();

router.get('/admin/product-category', authMiddleware.checkAdminAndStaff, AdminProductCategoryController.index);

router.get('/admin/product-category/create', authMiddleware.checkAdminAndStaff, AdminProductCategoryController.create);
router.post('/admin/product-category/create', authMiddleware.checkAdminAndStaff, Category.createCategory);

router.get('/admin/product-category/edit/:slug', authMiddleware.checkAdminAndStaff, AdminProductCategoryController.edit);
router.post('/admin/product-category/edit/:slug', authMiddleware.checkAdminAndStaff, Category.updateCategory);

router.get('/admin/product-category/delete/:id', authMiddleware.checkAdminAndStaff, Category.deleteCategory);

export default router;