import express from 'express';
import { getAllUsers, getUserContactCount } from '../controllers/admin.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { adminOnly } from '../middlewares/admin.middleware.js';

const router = express.Router();

router.get('/users', protect, adminOnly, getAllUsers);
router.get('/users/:userId/count', protect, adminOnly, getUserContactCount);

export default router;
