import express from 'express';
import { createPost, getPosts, getPostById, deletePost, getPostsByUserId } from '../controllers/post.controller.js';
import protectRoute from '../middlewares/protectRoute.js';
import multer from 'multer';
import path from 'path';
import { likePost, unlikePost } from '../controllers/like.controller.js';

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

// Route for getting posts by userId
router.get('/user/:userId', protectRoute, getPostsByUserId);

// Routes for liking and unliking posts
router.post('/:id/like', protectRoute, likePost);
router.post('/:id/unlike', protectRoute, unlikePost);

export default router;