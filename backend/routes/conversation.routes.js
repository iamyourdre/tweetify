import express from 'express';
import { getConversations } from '../controllers/conversation.controller.js';
import protectRoute from '../middlewares/protectRoute.js';

const router = express.Router();

router.get('/', protectRoute, getConversations);

export default router;