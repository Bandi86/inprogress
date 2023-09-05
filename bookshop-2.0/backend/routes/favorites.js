import express from "express";
import {getAllFavorites, addFavorites, deleteFavorites} from '../controllers/favorites.js'

const router = express.Router();

// összes kedvenc
router.get("/:bookId/favorites", getAllFavorites)

// Új kedvenc hozzáadása
router.post("/:bookId/favorites", addFavorites);

// Kedvenc törlése
router.delete("/:bookId/favorites/:id", deleteFavorites);

export default router;

