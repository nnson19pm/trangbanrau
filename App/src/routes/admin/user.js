/** @format */

import express from 'express';
import authMiddleware from '../../middleware/verifyAuth';
import AdminUserController from '../../controllers/admin/adminUser';

const router = express.Router();

router.get('/admin/user', authMiddleware.checkAdmin, AdminUserController.index);

router.get('/admin/user/edit/:id', authMiddleware.checkAdmin, AdminUserController.edit);
router.post('/admin/user/edit/:id', authMiddleware.checkAdmin, AdminUserController.update);

router.get('/admin/user/delete/:id', authMiddleware.checkAdmin, AdminUserController.delete);

router.get('/admin/user/create', authMiddleware.checkAdmin, AdminUserController.create);
router.post('/admin/user/create', authMiddleware.checkAdmin, AdminUserController.store);

router.get('/admin/my-profile', authMiddleware.checkAdminAndStaff, AdminUserController.myProfile);
router.post('/admin/my-profile', authMiddleware.checkAdminAndStaff, AdminUserController.update);

router.get('/admin/user/restore', authMiddleware.checkAdmin, AdminUserController.getUserDeleted);
router.get('/admin/user/restore/:id', authMiddleware.checkAdmin, AdminUserController.restoreUser);

router.get('/admin/my-profile/change-password', authMiddleware.checkAdminAndStaff, AdminUserController.getPageUpdatePassword);
router.post('/admin/my-profile/change-password', authMiddleware.checkAdminAndStaff, AdminUserController.updatePassword);



export default router;
