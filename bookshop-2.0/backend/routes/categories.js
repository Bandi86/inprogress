import express from 'express';
import {
  getAllCategorys,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categories.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.route('/', authMiddleware).post(createCategory).get(getAllCategorys);
router
  .route('/:id', authMiddleware)
  .get(getCategory)
  .patch(updateCategory)
  .patch(deleteCategory);

export default router;
