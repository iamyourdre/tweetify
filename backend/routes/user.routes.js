import express from 'express';
import protectRoute from '../middlewares/protectRoute.js';
import { getUsersBySearch, getFollowing, getFollowers, isFollowing, followUser, unfollowUser } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/:searchQuery', protectRoute, getUsersBySearch);
router.get('/following/:userId', protectRoute, getFollowing);
router.get('/followers/:userId', protectRoute, getFollowers);
router.get('/isFollowing/:targetUserId', protectRoute, isFollowing);
router.post('/follow/:targetUserId', protectRoute, followUser);
router.post('/unfollow/:targetUserId', protectRoute, unfollowUser);

export default router;