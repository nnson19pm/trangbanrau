/** @format */

import express from 'express';
import authMiddleware from '../middleware/verifyAuth';
import AdminOrderController from '../controllers/admin/adminOrder';
import db from '../models';

const router = express.Router();

router.get('/shipper', authMiddleware.checkShipper, AdminOrderController.indexPageShipper);
router.get('/shipper/:id', authMiddleware.checkShipper, AdminOrderController.updateStatus);
router.get('/search/shipper', authMiddleware.checkShipper, async (req, res) => {
    const code = req.query.code;
    // code = MHDGT1 -> code = 1 do not take the first 5 characters
    const orderId = code.substring(5);
    const order = await db.Order.findOne({
        where: {
            id: orderId
        }
    })

    if(order) {     
        res.render('pages/searchShipper', {
            order
        }) 
    } else {
        res.render('err/404')
    }
});



export default router;
