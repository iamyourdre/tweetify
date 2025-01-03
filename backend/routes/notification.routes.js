import express from 'express';
import { createNotification, getNotifications, markAsRead } from '../controllers/notification.controller.js';
import protectRoute from '../middlewares/protectRoute.js';

const router = express.Router();

router.post('/', protectRoute, createNotification);
router.get('/', protectRoute, getNotifications);
router.patch('/:id/read', protectRoute, markAsRead);

export default router;