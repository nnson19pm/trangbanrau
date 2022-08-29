/** @format */

import express from 'express';
import authMiddleware from '../../middleware/verifyAuth';
import AdminIncomeController from '../../controllers/admin/adminIncome';

const router = express.Router();

router.get('/admin/analytic/income', authMiddleware.checkAdminAndStaff, AdminIncomeController.index);

export default router;
