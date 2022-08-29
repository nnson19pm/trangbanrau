/** @format */

import express from 'express';
import authMiddleware from '../../middleware/verifyAuth';
import adminDashboard from '../../controllers/admin/adminDashboard';
const router = express.Router();

router.get('/admin', authMiddleware.checkAdminAndStaff, adminDashboard.index);
router.get('/api/admin', authMiddleware.checkAdminAndStaff, adminDashboard.apiIndex);
router.get('/api/admin/order', authMiddleware.checkAdminAndStaff, adminDashboard.apiGetOrder);
export default router;
