import express from 'express';
import protectRoute from '../middlewares/protectRoute.js';
import { getUsersForPreview } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', protectRoute, getUsersForPreview);

export default router;