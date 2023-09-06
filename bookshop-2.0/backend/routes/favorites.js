import express from 'express';
import {
  getAllFavorites,
  addFavorites,
  deleteFavorites,
} from '../controllers/favorites.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// összes kedvenc
router.get('/:bookId/favorites', authMiddleware, getAllFavorites);

// Új kedvenc hozzáadása
router.post('/:bookId/favorites', authMiddleware, addFavorites);

// Kedvenc törlése
router.delete('/:bookId/favorites/:id', authMiddleware, deleteFavorites);

export default router;
