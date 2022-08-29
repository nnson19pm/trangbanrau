/** @format */

import express from 'express';
import authMiddleware from '../../middleware/verifyAuth';
import AdminBlogCategoryController from '../../controllers/admin/adminBlogCategory';

const router = express.Router();

router.get('/admin/blog-category', authMiddleware.checkAdminAndStaff, AdminBlogCategoryController.index);

router.get('/admin/blog-category/edit/:slug', authMiddleware.checkAdminAndStaff, AdminBlogCategoryController.edit);
router.post('/admin/blog-category/edit/:slug', authMiddleware.checkAdminAndStaff, AdminBlogCategoryController.update);

router.get('/admin/blog-category/delete/:slug', authMiddleware.checkAdminAndStaff, AdminBlogCategoryController.delete);

router.get('/admin/blog-category/create', authMiddleware.checkAdminAndStaff, AdminBlogCategoryController.create);
router.post('/admin/blog-category/create', authMiddleware.checkAdminAndStaff, AdminBlogCategoryController.store);

export default router;
