/** @format */

import express from 'express';
import authMiddleware from '../../middleware/verifyAuth';

const router = express.Router();

router.get('/admin/invoice-receipt', authMiddleware.checkAdminAndStaff, (req, res) => {
    res.render('pages/invoiceReceipt');
});

export default router;
