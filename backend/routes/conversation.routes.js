import express from 'express';
import { createConversation, getConversationById, getConversations } from '../controllers/conversation.controller.js';
import protectRoute from '../middlewares/protectRoute.js';

const router = express.Router();

router.get('/', protectRoute, getConversations);
router.get('/:id', protectRoute, getConversationById);
router.post('/', protectRoute, createConversation);

export default router;