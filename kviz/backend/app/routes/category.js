import express from 'express';
import {
  getCategorys,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categorys.js';

const router = express.Router();

router.get('/', getCategorys);
router.get('/:categoryId', getCategory);
router.post('/', createCategory);
router.put('/:categoryId', updateCategory);
router.delete('/:categoryId', deleteCategory);

export default router