import express from 'express';
import { createPost, getPosts, getPostById, deletePost } from '../controllers/post.controller.js';
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

router.post('/', protectRoute, upload.array('media', 4), createPost);
router.get('/', getPosts);
router.get('/:id', getPostById);
router.delete('/:id', protectRoute, deletePost);

export default router;