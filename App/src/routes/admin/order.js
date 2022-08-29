/** @format */

import express from 'express';
import authMiddleware from '../../middleware/verifyAuth';
import AdminOrderController from '../../controllers/admin/adminOrder';

const router = express.Router();

router.get('/admin/order', authMiddleware.checkAdminAndStaff, AdminOrderController.index);

router.get('/admin/order/edit/:id', authMiddleware.checkAdminAndStaff, AdminOrderController.edit);
router.post('/admin/order/edit/:id', authMiddleware.checkAdminAndStaff, AdminOrderController.update);

router.get('/admin/order/delete/:id', authMiddleware.checkAdminAndStaff, AdminOrderController.delete);

router.get('/admin/invoice/:id', authMiddleware.checkAdminAndStaff, AdminOrderController.receipt);


export default router;
