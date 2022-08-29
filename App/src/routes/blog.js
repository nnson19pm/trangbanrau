/** @format */

import express from 'express';
// import authMiddleware from '../middleware/verifyAuth';
import blogController from '../controllers/blog';

const router = express.Router();

router.get('/blogs', blogController.index);

router.get('/blog/:slug', blogController.detail);

export default router;
