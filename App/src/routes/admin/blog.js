/** @format */

import express from 'express';
import authMiddleware from '../../middleware/verifyAuth';
import AdminBlogController from '../../controllers/admin/adminBlog';
import { uploadSingle } from '../../middleware/uploadSingle';

const router = express.Router();

router.get('/admin/blog', authMiddleware.checkAdminAndStaff, AdminBlogController.index);

router.get('/admin/blog/edit/:slug', authMiddleware.checkAdminAndStaff, AdminBlogController.edit);
router.post('/admin/blog/edit/:slug', [authMiddleware.checkAdminAndStaff, uploadSingle], AdminBlogController.update);

router.get('/admin/blog/delete/:slug', authMiddleware.checkAdminAndStaff, AdminBlogController.delete);

router.get('/admin/blog/create', authMiddleware.checkAdminAndStaff, AdminBlogController.create);
router.post('/admin/blog/create', [authMiddleware.checkAdminAndStaff, uploadSingle], AdminBlogController.store);

export default router;
