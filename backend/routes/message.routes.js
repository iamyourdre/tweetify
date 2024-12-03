import express from 'express';
import { sendMessage, getMessages } from '../controllers/message.controller.js';
import protectRoute from '../middlewares/protectRoute.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get('/:id', protectRoute, getMessages);
router.post('/send/:id', protectRoute, upload.single('image'), sendMessage);

export default router;