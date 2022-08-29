/** @format */

import express from 'express';
import authController from '../controllers/auth';

import authMiddleware from '../middleware/verifyAuth';
const router = express.Router();

router.get('/login', authController.login);
router.post('/login', authController.doLogin);

router.get('/register', authController.register);
router.post('/register', authController.doRegister);

// router.post("/api/refresh-token", jwtToken.requestRefreshToken);
router.get('/api/logout', authController.logout);

export default router;
