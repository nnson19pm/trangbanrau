/** @format */

import express from 'express';

import authMiddleware from '../middleware/verifyAuth';
import myOrder from '../controllers/myOrder';
const router = express.Router();

router.get('/my-order', authMiddleware.checkUser, myOrder.index);
router.get('/my-order/cancel/:id', authMiddleware.checkUser, myOrder.cancel);



export default router;
