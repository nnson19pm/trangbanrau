/** @format */

import express from 'express';
// import authMiddleware from '../middleware/verifyAuth';
import blogCategoryController from '../controllers/blogCategory';

const router = express.Router();

router.get('/blog-cate/:slug', blogCategoryController.detail);

export default router;
