import express from 'express';
import {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} from '../controllers/books.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.route('/').post(authMiddleware, createBook).get(getAllBooks);
router
  .route('/:id')
  .get(getBook)
  .patch(authMiddleware, deleteBook)
  .patch(authMiddleware, updateBook);

export default router;
