import express from 'express';
/* import { createCommentReply, getRepliesForComment } from '../controllers/commentsController.js';
import { getCommentLikes, likeComment, unlikeComment } from '../controllers/likeController.js'; */

const router = express.Router();

/* // Kommentekhez tartozó like-ok lekérése
router.get('/:commentId/likes', getCommentLikes);

// Komment like-olása és like eltávolítása
router.post('/:commentId/like', likeComment);
router.delete('/:commentId/likes/:likeId', unlikeComment);

// Kommentre adott válaszok lekérése és válasz létrehozása
router.get('/:commentId/replies', getRepliesForComment);
router.post('/:commentId/replies', createCommentReply); */

export default router