/** @format */

import express from 'express';
import collectionsController from '../controllers/collections';

const router = express.Router();

router.get('/collections', collectionsController.collections);
router.get('/collections/search', collectionsController.getCollectionsByKeyword);

export default router;
