/** @format */

import express from 'express';

import HomeController from '../controllers/home';

const router = express.Router();

router.get('/', HomeController.home);

export default router;
