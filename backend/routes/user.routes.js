import express from 'express';
import protectRoute from '../middlewares/protectRoute.js';
import { getUsersBySearch } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/:searchQuery', protectRoute, getUsersBySearch);

export default router;