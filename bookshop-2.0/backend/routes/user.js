import express from 'express';
import { getAllUser, getUser, deleteUser } from '../controllers/user.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/', authMiddleware, getAllUser);
router.get('/:id', authMiddleware, getUser);
router.delete('/id', authMiddleware, deleteUser);

export default router;
