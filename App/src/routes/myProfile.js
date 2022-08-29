/** @format */

import express from 'express';

import authMiddleware from '../middleware/verifyAuth';
import AdminUserController from '../controllers/admin/adminUser';
import { getUser } from '../services/userService';

const router = express.Router();

//PROFILE
router.get('/my-profile', authMiddleware.checkUser , async (req, res) => {
    const id = req.session?.user.id
    if (!id) {
        res.render('error/404')
    }
    const user = await getUser(id)
    res.render('pages/user/myProfile',{
        user
    })
});
router.post('/my-profile', authMiddleware.checkUser , AdminUserController.update);

//CHANGE PASSWORD
router.get('/my-profile/change-password', authMiddleware.checkUser , (req, res) => {
    res.render('pages/user/changePassword');
} );
router.post('/my-profile/change-password', authMiddleware.checkUser , AdminUserController.updatePassword);

export default router;